import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { AdminsService } from './admins.service';
import { AdminsResolver } from './admins.resolver';

@Module({
  imports: [ TypeOrmModule.forFeature([Admin])],
  providers: [AdminsResolver, AdminsService],
  exports: [AdminsService],
})
export class AdminsModule {}

