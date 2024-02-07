import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserInput } from './dto/update-user.input';
import { RegisterUserInput } from './dto/register-user.input';
import { In, Not, Repository, FindOneOptions, FindManyOptions, FindOptionsWhere, } from 'typeorm';
import { Inject, Logger, forwardRef, Injectable, ConflictException, NotFoundException, UseGuards, } from '@nestjs/common';
import { JWTAuthGuard } from '../auth/guards/auth.guard';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) { }

  async createUser(
    registerUserInput: Partial<RegisterUserInput>,
  ): Promise<User> {
    const { mobileNumber, ...rest } = registerUserInput;
    const isUserExists = await this.userRepo.findOne({
      where: { mobileNumber: mobileNumber },
    });

    if (isUserExists) {
      throw new ConflictException(
        `User with mobileNumber: ${mobileNumber} not exist!`,
      );
    }

    const user = this.userRepo.create({ ...rest, mobileNumber });
    return this.userRepo.save(user);
  }

  @UseGuards(JWTAuthGuard)
  async updateUser(userId: number, updateUserInput: UpdateUserInput) {
    const userFromDB = await this.userRepo.findOneBy({ id: userId });
    if (!userFromDB) {
      throw new NotFoundException("User with given id doesn't exists");
    }

    const { mobileNumber = null, ...rest } = updateUserInput;
    if (mobileNumber) {
      const isMobileNumberUsed = await this.userRepo.findOneBy({
        mobileNumber,
        id: Not(userId),
      });

      if (isMobileNumberUsed) {
        throw new ConflictException('Mobile number is already in use.');
      }
    }

    return this.userRepo.save({ ...userFromDB, ...rest });
  }

  @UseGuards(JWTAuthGuard)
  async findAll(findManyOptions: FindManyOptions) {
    return this.userRepo.find(findManyOptions);
  }

  @UseGuards(JWTAuthGuard)
  async findOneById(mobileNumber) {
    if (!mobileNumber) return null;
    return this.userRepo.findOneBy({ mobileNumber: mobileNumber });
  }

  @UseGuards(JWTAuthGuard)
  async findOne(options: FindOneOptions<User>) {
    return this.userRepo.findOne(options);
  }
}
