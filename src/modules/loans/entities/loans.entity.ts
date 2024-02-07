import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';

@Entity({ name: 'loans' })
export class LoanEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    loanAmount: string;

    @Column({ nullable: false })
    FullName: string;

    @Column({ nullable: true, unique: true })
    EmailAddress: string;

    @Column({ nullable: true })
    Address: string;

    @Column({ nullable: true })
    Occupation: string;
  
    @Column({ nullable: true })
    MaritalStatus: string;
  
    @Column({ nullable: true })
    PanCardNumber: string;
  
    @Column({ nullable: true })
    AadharCardNumber: string;

    @ManyToOne(() => User, (users) => users.user_id)
    @JoinColumn({ name: 'user_id' })
    user: User[];

    @Column()
    user_id: string;

    @CreateDateColumn()
    createdAt: Date;
}

