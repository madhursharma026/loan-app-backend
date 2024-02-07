import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber, IsString, IsDefined, IsNotEmpty, IsPositive, } from 'class-validator';

@InputType()
export class RegisterAdminInput {
  @Field(() => String, { nullable: false })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  mobileNumber: string;

  @Field(() => String, { nullable: false })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  FullName: string;

  @Field(() => String, { nullable: false })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  EmailAddress: string;

  @Field(() => String, { nullable: false })
  @IsString()
  @IsPositive()
  @IsDefined()
  Address: string;

  @Field(() => String, { nullable: false })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  Occupation: string;

  @Field(() => String, { nullable: false })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  MaritalStatus: string;

  @Field(() => Int, { nullable: false })
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  PanCardNumber: number;

  @Field(() => Int, { nullable: false })
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  AadharCardNumber: number;
}
