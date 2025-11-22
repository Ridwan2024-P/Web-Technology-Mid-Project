import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Admin } from '../Admin/admin.entity';

@Entity('Announcements')
export class Announcement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @ManyToOne(() => Admin, admin => admin.announcements)
  admin: Admin;
}
