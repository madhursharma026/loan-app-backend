import { Entity, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, } from 'typeorm';

@Entity({ name: 'admin' })
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  mobileNumber: string;

  @Column({ nullable: true })
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
  PanCardNumber: number;

  @Column({ nullable: true })
  AadharCardNumber: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
