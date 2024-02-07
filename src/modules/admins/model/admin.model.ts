import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AdminModel {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  mobileNumber: string;

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

  @Field(() => Int, { nullable: true })
  PanCardNumber: number;

  @Field(() => Int, { nullable: true })
  AadharCardNumber: number;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
