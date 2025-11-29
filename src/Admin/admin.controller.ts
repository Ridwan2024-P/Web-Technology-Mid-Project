import { Controller, Post, Body,  Get, Put,Param, Patch,Delete,UseGuards,Req} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminDto } from "./admin.dto";
import { ManagerDto } from "./manager.dto";
import { CreateAnnouncementDto } from "./announcement.dto";
import { Announcement } from "./announcement.entity";
import { LoginDto } from "./Login.dto";
import { JwtAuthGuard } from "src/auth/jwt.guard";

@Controller('admin')
export class AdminController {
  
  @Get('profile')
  getProfile(@Req() req) {
    return { message: 'Protected admin profile', user: req.user };
  }
  constructor(private readonly adminService: AdminService) {}

  @Post()
  postAdmin(@Body() adminDto: AdminDto) {
    return this.adminService.createAdmin(adminDto);
  }
  @Post('manager')
  postManager(@Body() managerDto: ManagerDto) {
    return this.adminService.createManager(managerDto);
  }
 
  @Get('managers/:adminId')
  getManagersByAdmin(@Body('adminId') adminId: number) {
    return this.adminService.getManagersByAdmin(adminId);
  }

  @Get('manager/:managerId')
  getManagerById(@Body('managerId') managerId: number) {
    return this.adminService.getManagerById(managerId);
  }
  @Put('manager/:managerId')
  updateManager(@Param('managerId') managerId: number,@Body() ManagerDto: Partial<ManagerDto>, ) {
    return this.adminService.updateManager(managerId, ManagerDto);
  }
  @Patch('manager/:managerId')
  updateManagerStatus(@Param('managerId') managerId: number, @Body('status') status: string ) {
    return this.adminService.updateManagerStatus(managerId, status);
  }

  @Delete('manager/:managerId')
  deleteManager(@Param('managerId') managerId: number) {
    return this.adminService.deleteManager(managerId);
  }
   @Post('announcement')
  create(@Body() dto: CreateAnnouncementDto) {
    return this.adminService.createAnnouncement(dto);
  }
  @Get('announcements')
  async getAllAnnouncements(): Promise<Announcement[]> {
    return this.adminService.getAllAnnouncements();
  }

 

}
