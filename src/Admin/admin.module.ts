import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Admin } from './admin.entity';
import { Manager } from './manager.entity';
import { Announcement } from './announcement.entity';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [TypeOrmModule.forFeature([Admin,Manager,Announcement]),AuthModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}