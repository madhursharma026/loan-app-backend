import { Calls } from "./schema/calls.schema";
import { CallsService } from "./calls.service";
import { CreateCallsArgs } from "./args/create.calls.args";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

@Resolver(of => Calls)
export class CallsResolver {
    constructor(private readonly razorrpayService: CallsService) { }

    @Mutation(returns => Calls, { name: 'createCalls' })
    createCalls(@Args('createCallsArgs') createCallsArgs: CreateCallsArgs) {
        return this.razorrpayService.createCalls(createCallsArgs);
    }
}

