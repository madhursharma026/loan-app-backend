import { UseGuards } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminModel } from './model/admin.model';
import { JWTAuthGuard } from '../auth/guards/auth.guard';
import { User } from '../auth/decorators/user.decorator';
import { UpdateAdminInput } from './dto/update-admin.input';
import { Int, Args, Query, Mutation, Resolver, } from '@nestjs/graphql';
import { ICurrentUser } from '../auth/interfaces/current-user.interface';

@Resolver(() => AdminModel)
export class AdminsResolver {
  constructor(private readonly adminsService: AdminsService) { }

  @UseGuards(JWTAuthGuard)
  @Query(() => [AdminModel], { name: 'admins' })
  findAll() {
    return this.adminsService.findAll();
  }

  @UseGuards(JWTAuthGuard)
  @Query(() => AdminModel, { name: 'admin' })
  findOne(@Args('mobileNumber') mobileNumber: string) {
    return this.adminsService.findOneById(mobileNumber);
  }

  @UseGuards(JWTAuthGuard)
  @Mutation(() => AdminModel)
  updateAdmin(
    @User() currentAdmin: ICurrentUser,
    @Args('updateAdminInput') updateAdminInput: UpdateAdminInput,
  ) {
    return this.adminsService.updateAdmin(currentAdmin.id, updateAdminInput,);
  }
}

