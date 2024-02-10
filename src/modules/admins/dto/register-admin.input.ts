import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber, IsString, IsDefined, IsNotEmpty, IsPositive, } from 'class-validator';

@InputType()
export class RegisterAdminInput {
  @Field(() => String, { nullable: false })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  mobileNumber: string;
}
