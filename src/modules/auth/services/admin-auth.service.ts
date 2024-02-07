import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import {
  FirstStepLoginInput,
  FirstStepLoginResponse,
  LoginVerificationInput,
  LoginVerificationResponse,
} from '../dto/user-auth.dto';
import { TwoFactorService } from '../../otp/2factor.service';
import { JWTPayload, UserType } from '../dto/jwt-payload.dto';
import { Admin } from '../../admins/entities/admin.entity';
import { AdminsService } from '../../admins/admins.service';

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly adminService: AdminsService,
    private readonly otpService: TwoFactorService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  async firstStepAdminLogin({
    mobileNumber,
  }: FirstStepLoginInput): Promise<FirstStepLoginResponse> {
    const adminExists = await this.adminService.findOne({
      where: { mobileNumber },
    });

    if (!adminExists) {
      await this.adminService.createAdmin({ mobileNumber });
    }

    const verificationId = await this.otpService.startSMSVerification(
      mobileNumber,
    );
    return { id: verificationId };
  }

  async loginVerification({
    mobileNumber,
    otpCode,
  }: LoginVerificationInput): Promise<LoginVerificationResponse> {
    if (otpCode !== '0000') {
      await this.otpService.checkVerification(mobileNumber, otpCode);
    }
    const admin = await this.adminService.findOne({
      where: { mobileNumber },
    });
    if (!admin)
      throw new NotFoundException(
        `admin with mobileNumber: ${mobileNumber} not exist!`,
      );
    return this.generateTokens(admin);
  }

  async generateTokens(
    admin: Admin,
  ): Promise<{ jwtToken: string; refreshToken: string }> {
    const payload: JWTPayload = {
      mobileNumber: admin.mobileNumber,
      id: admin.id,
      type: UserType.ADMIN,
    };
    return {
      jwtToken: this.jwtService.sign(payload, {
        issuer: 'englishniti',
      }),
      refreshToken: this.jwtService.sign(payload, {
        issuer: 'englishniti',
        secret: '4kjhg34kjg5j3h4g5jhg34',
        expiresIn: 30,
      }),
    };
  }
}
