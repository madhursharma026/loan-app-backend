import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'calls' })
export class CallsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    order_id: string;

    @Column()
    amount: string;

    @CreateDateColumn()
    createdAt: Date;
}

