import { InputType, Field, Int, } from "@nestjs/graphql";
import { IsDefined, IsNotEmpty, IsNumber, IsString } from "class-validator";

@InputType()
export class AddLoansArgs {
    @Field({ nullable: false })
    loanAmount: string;

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
  
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    PanCardNumber: string;
  
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    AadharCardNumber: string;
    
    @Field({ nullable: false })
    user_id: string;
}

