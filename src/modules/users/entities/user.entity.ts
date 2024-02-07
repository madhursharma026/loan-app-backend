import { LoanEntity } from 'src/modules/loans/entities/loans.entity';
import { Column, Entity, OneToMany, DeepPartial, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  constructor(userLikeObject: DeepPartial<User>) { return Object.assign(this, userLikeObject); }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  mobileNumber: string;

  @OneToMany(() => LoanEntity, (loans) => loans.user)
  user_id: LoanEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

