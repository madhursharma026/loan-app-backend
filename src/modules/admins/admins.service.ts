import { Admin } from './entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateAdminInput } from './dto/update-admin.input';
import { RegisterAdminInput } from './dto/register-admin.input';
import { FindOneOptions, FindOptionsWhere, Not, Repository } from 'typeorm';
import { Logger, Injectable, ConflictException, NotFoundException, } from '@nestjs/common';

@Injectable()
export class AdminsService {
  private logger = new Logger(AdminsService.name);
  constructor(@InjectRepository(Admin) private readonly adminRepo: Repository<Admin>) { }

  async createAdmin(registerAdminInput: Partial<RegisterAdminInput>) {
    const { mobileNumber, ...rest } = registerAdminInput;
    const isAdminExists = await this.adminRepo.findOne({ where: { mobileNumber } });
    if (isAdminExists) {
      throw new ConflictException(
        `Admin with mobileNumber: ${mobileNumber} not exist!`,
      );
    }
    const admin = this.adminRepo.create({ ...rest, mobileNumber });
    return this.adminRepo.save(admin);
  }

  findAll() {
    return this.adminRepo.find();
  }

  findOne(options: FindOneOptions<Admin>) {
    return this.adminRepo.findOne(options);
  }

  findOneById(adminId: number) {
    return this.adminRepo.findOneBy({ id: adminId });
  }

  async update(
    findOptions: FindOptionsWhere<Admin>,
    update: Partial<Admin>,
  ) {
    return this.adminRepo.update(findOptions, update);
  }

  async updateAdmin(adminId: number, updateAdminInput: UpdateAdminInput,) {
    const adminFromDB = await this.adminRepo.findOneBy({ id: adminId });
    if (!adminFromDB) {
      throw new NotFoundException("User with given id doesn't exists");
    }
    const { mobileNumber = null, ...rest } = updateAdminInput;
    if (mobileNumber) {
      const isMobileNumberUsed = await this.adminRepo.findOneBy({
        mobileNumber,
        id: Not(adminId),
      });
      if (isMobileNumberUsed) {
        throw new ConflictException('Mobile number is already in use.');
      }
    }
    return this.adminRepo.save({ ...adminFromDB, ...rest });
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
