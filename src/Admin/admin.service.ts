import { Injectable, NotFoundException } from "@nestjs/common";
import { AdminDto } from "./admin.dto";
import { ManagerDto } from "./manager.dto";
import { Admin } from "./admin.entity";
import { Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm'; 
import { Manager } from "./manager.entity";
import { Announcement } from "./announcement.entity";
import { CreateAnnouncementDto } from "./announcement.dto";


@Injectable()
export class AdminService {
    constructor(
  @InjectRepository(Admin)private readonly adminRepo: Repository<Admin>,

  @InjectRepository(Manager)private readonly managerRepo: Repository<Manager>,
  
  @InjectRepository(Announcement)private announcementRepo: Repository<Announcement>){}

    async createAdmin(adminDto: AdminDto): Promise<Admin> {
        const admin = this.adminRepo.create(adminDto);
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
    return this.announcementRepo.save(announcement);
  }
 async getAllAnnouncements(): Promise<Announcement[]> {
  return this.announcementRepo.find();
 }


}