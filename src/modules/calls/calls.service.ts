import { Repository } from 'typeorm';
import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CallsEntity } from './entities/calls.entity';
import { CreateCallsArgs } from './args/create.calls.args';

@Injectable()
export class CallsService {
  constructor(@InjectRepository(CallsEntity) public readonly callsRepo: Repository<CallsEntity>) { }
  
  async createCalls(createCallsArgs: CreateCallsArgs): Promise<CallsEntity> {
    let calls: CallsEntity = new CallsEntity();
    calls.order_id = createCallsArgs.order_id
    calls.amount = createCallsArgs.amount
    let callsSave = await this.callsRepo.save(calls);
    return await this.callsRepo.findOne({ where: { id: callsSave.id }, relations: ['user'] })
  }
}
