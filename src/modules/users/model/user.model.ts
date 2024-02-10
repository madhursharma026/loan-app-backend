import { Int, Field, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  mobileNumber: string;

  @Field(() => String)
  status: string;

  // @Field(() => GraphQLISODateTime)
  // createdAt: Date;

  // @Field(() => GraphQLISODateTime)
  // updatedAt: Date;

  @Field((type) => String)
  createdAt: String;

  @Field((type) => String)
  updatedAt: String;
}

