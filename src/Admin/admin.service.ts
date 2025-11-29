import { Injectable, NotFoundException } from "@nestjs/common";
import { AdminDto } from "./admin.dto";
import { ManagerDto } from "./manager.dto";
import { Admin } from "./admin.entity";
import { Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm'; 
import { Manager } from "./manager.entity";
import { Announcement } from "./announcement.entity";
import { CreateAnnouncementDto } from "./announcement.dto";
import { LoginDto } from "./Login.dto";
import { MESSAGES } from "@nestjs/core/constants";
import * as bcrypt from 'bcrypt';
import { EmailService } from "src/email/email.service";


@Injectable()
export class AdminService {
    constructor(
  @InjectRepository(Admin)private readonly adminRepo: Repository<Admin>,

  @InjectRepository(Manager)private readonly managerRepo: Repository<Manager>,
  
  @InjectRepository(Announcement)private announcementRepo: Repository<Announcement>,
  private readonly emailService: EmailService,
){}

    async createAdmin(adminDto: AdminDto): Promise<Admin> {
      const adminExists = await this.adminRepo.findOneBy({ email: adminDto.email });
      if (adminExists) {
        throw new NotFoundException('Admin with this email already exists');
      }
       const hashedPassword = await bcrypt.hash(adminDto.password, 10);
        const admin = this.adminRepo.create({
          ...adminDto,
          password: hashedPassword,
        });
        return this.adminRepo.save(admin);
    }

    async createManager(managerDto: ManagerDto): Promise<Manager> {
        const admin = await this.adminRepo.findOneBy({ id: managerDto.adminId });
        if (!admin) throw new NotFoundException("Admin not found");
        const manager = this.managerRepo.create({
         ...managerDto,
         admin: admin,});
        return this.managerRepo.save(manager);  
}
  async getManagersByAdmin(adminId: number): Promise<Manager[]> {
    const admin = await this.adminRepo.findOne({
      where: { id: adminId },
      relations: ['managers'],
    });
    if (!admin) throw new NotFoundException("Admin not found");

    return admin.managers;
  }
 async getManagerById(managerId: number): Promise<Manager> {
    const manager = await this.managerRepo.findOneBy({ id: managerId });
    if (!manager) throw new NotFoundException("Manager not found");
    return manager;

}
 async updateManager(managerId: number, ManagerDto: Partial<ManagerDto>): Promise<Manager> {
  const manager = await this.managerRepo.findOne({ where: { id: managerId } });
  if (!manager) throw new NotFoundException('Manager not found');

  Object.assign(manager, ManagerDto); 
  return this.managerRepo.save(manager);
}
 async updateManagerStatus(managerId: number, status: string): Promise<Manager> {
  const manager = await this.managerRepo.findOne({ where: { id: managerId } });
  if (!manager) throw new NotFoundException('Manager not found');

  manager.status = status;
  return this.managerRepo.save(manager);
}

 async deleteManager(managerId: number): Promise<{ message: string }> {
  const manager = await this.managerRepo.findOne({ where: { id: managerId } });
  if (!manager) throw new NotFoundException('Manager not found');

  await this.managerRepo.remove(manager);
  return { message: 'Manager deleted successfully' };
}

async createAnnouncement(dto: CreateAnnouncementDto): Promise<Announcement> {
   
    const announcement = this.announcementRepo.create(dto);
    const saved = await this.announcementRepo.save(announcement);


    const managers = await this.managerRepo.find(); 
    const emails = managers.map(m => m.email).join(','); 

   
    await this.emailService.sendEmail({
        recipients: emails,
        subject: `New Announcement: ${dto.title}`,
        html: `<p>${dto.message}</p>`
    });

    return saved;
}


 async getAllAnnouncements(): Promise<Announcement[]> {
  return this.announcementRepo.find();
 }


    
  
}