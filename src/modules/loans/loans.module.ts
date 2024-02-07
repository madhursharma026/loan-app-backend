import { Module } from "@nestjs/common";
import { LoanService } from "./loans.service";
import { LoanResolver } from "./loans.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoanEntity } from "./entities/loans.entity";

@Module({
    imports: [TypeOrmModule.forFeature([LoanEntity])],
    controllers: [],
    providers: [LoanService, LoanResolver],
})

export class LoanModule { }
