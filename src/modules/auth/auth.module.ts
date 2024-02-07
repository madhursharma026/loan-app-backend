import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { OtpModule } from '../otp/otp.module';
import { UsersModule } from '../users/users.module';
import { AuthService } from './services/user-auth.service';
import { AdminsModule } from '../admins/admins.module';
import { UserAuthResolver } from './resolvers/user-auth.resolver';
import { AdminAuthService } from './services/admin-auth.service';
import { AdminAuthResolver } from './resolvers/admin-auth.resolver';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: 'secret_KEsdfsdfjkshdfkja2kjh34kj2h3',
        signOptions: { expiresIn: '7d' },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    OtpModule,
    AdminsModule,
  ],
  providers: [
    UserAuthResolver,
    AuthService,
    AdminAuthService,
    AdminAuthResolver,
  ],
})
export class AuthModule { }
