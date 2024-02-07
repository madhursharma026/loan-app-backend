import { ObjectType, Field, Int } from "@nestjs/graphql";
import { UserModel } from "src/modules/users/model/user.model";

@ObjectType()
export class Loans {
    @Field((type) => Int)
    id: number;

    @Field((type) => String, {nullable: true})
    loanAmount: string;

    @Field(() => String, { nullable: true })
    FullName: string;

    @Field(() => String, { nullable: true })
    EmailAddress: string;

    @Field(() => String, { nullable: true })
    Address: string;

    @Field(() => String, { nullable: true })
    Occupation: string;
  
    @Field(() => String, { nullable: true })
    MaritalStatus: string;
  
    @Field(() => String, { nullable: true })
    PanCardNumber: string;
  
    @Field(() => String, { nullable: true })
    AadharCardNumber: string;

    @Field((type) => UserModel)
    user: UserModel[];

    @Field((type) => String)
    createdAt: String;
}

