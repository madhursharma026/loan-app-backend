import { Loans } from "./schema/loans.schema";
import { LoanService } from "./loans.service";
import { AddLoansArgs } from "./args/add.loans.args";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { JWTAuthGuard } from "../auth/guards/auth.guard";

@Resolver(of => Loans)
export class LoanResolver {
    constructor(private readonly loanService: LoanService) { }

    @UseGuards(JWTAuthGuard)
    @Mutation(returns => Loans, { name: 'applyLoan' })
    applyLoan(@Args('addLoansArgs') addLoansArgs: AddLoansArgs) {
        return this.loanService.applyLoan(addLoansArgs);
    }
}
