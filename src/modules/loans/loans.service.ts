import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { LoanEntity } from './entities/loans.entity';
import { AddLoansArgs } from './args/add.loans.args';
import { Injectable, ConflictException } from "@nestjs/common";

@Injectable()
export class LoanService {
  constructor(@InjectRepository(LoanEntity) public readonly loanRepo: Repository<LoanEntity>) { }

  async applyLoan(addLoansArgs: AddLoansArgs): Promise<LoanEntity> {
    let loanDetail: LoanEntity = new LoanEntity();
    loanDetail.loanAmount = addLoansArgs.loanAmount;
    loanDetail.FullName = addLoansArgs.FullName;
    loanDetail.EmailAddress = addLoansArgs.EmailAddress;
    loanDetail.Address = addLoansArgs.Address;
    loanDetail.Occupation = addLoansArgs.Occupation;
    loanDetail.MaritalStatus = addLoansArgs.MaritalStatus;
    loanDetail.PanCardNumber = addLoansArgs.PanCardNumber;
    loanDetail.AadharCardNumber = addLoansArgs.AadharCardNumber;
    loanDetail.user_id = addLoansArgs.user_id;
    let loanDetailSave = await this.loanRepo.save(loanDetail);
    return await this.loanRepo.findOne({ where: { id: loanDetailSave.id }, relations: ['user'] })
  }
}
