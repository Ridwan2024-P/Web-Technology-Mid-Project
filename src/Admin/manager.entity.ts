import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Admin } from '../Admin/admin.entity';

@Entity('managers')
export class Manager {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'active' })
  status: string;

  @ManyToOne(() => Admin, admin => admin.managers, { nullable: false })
  admin: Admin;
}
