import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Manager } from '../Admin/manager.entity';
import { Announcement } from '../Admin/announcement.entity';

@Entity("admins")
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Manager, manager => manager.admin)
  managers: Manager[];

  @OneToMany(() => Announcement, announcement => announcement.admin)
  announcements: Announcement[];
}
