import { InputType, PartialType } from '@nestjs/graphql';

import { RegisterAdminInput } from './register-admin.input';
@InputType()
export class UpdateAdminInput extends PartialType(RegisterAdminInput) {}
