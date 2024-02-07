import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
  FirstStepLoginInput,
  FirstStepLoginResponse,
  LoginVerificationInput,
  LoginVerificationResponse,
} from '../dto/user-auth.dto';

import { AdminAuthService } from '../services/admin-auth.service';

@Resolver()
export class AdminAuthResolver {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Mutation(() => FirstStepLoginResponse)
  firstStepAdminLogin(
    @Args('firstStepLoginInput')
    firstStepLoginInput: FirstStepLoginInput,
  ) {
    return this.adminAuthService.firstStepAdminLogin(firstStepLoginInput);
  }

  @Mutation(() => LoginVerificationResponse)
  adminLoginVerification(
    @Args('loginVerificationInput')
    loginVerificationInput: LoginVerificationInput,
  ) {
    return this.adminAuthService.loginVerification(loginVerificationInput);
  }
}
