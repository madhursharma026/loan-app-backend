import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CallsService } from "./calls.service";
import { CallsResolver } from "./calls.resolver";
import { CallsEntity } from "./entities/calls.entity";

@Module({
    imports: [TypeOrmModule.forFeature([CallsEntity])],
    controllers: [],
    providers: [CallsService, CallsResolver],
})

export class CallsModule { }
