import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsDefined, IsNotEmpty, } from 'class-validator';

@InputType({ description: 'Create User inputs' })
export class RegisterUserInput {
  @Field(() => String, { nullable: false })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  mobileNumber: string;
}
