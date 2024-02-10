import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class Calls {
    @Field((type) => Int)
    id: number;

    @Field((type) => String, { nullable: true })
    order_id: string;

    @Field((type) => String, { nullable: true })
    amount: string;

    @Field((type) => String)
    createdAt: String;
}

