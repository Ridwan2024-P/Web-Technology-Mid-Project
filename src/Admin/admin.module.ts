import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Admin } from './admin.entity';
import { Manager } from './manager.entity';
import { Announcement } from './announcement.entity';
import { AuthModule } from 'src/auth/auth.module';
import { EmailService } from 'src/email/email.service';
import { EmailModule } from 'src/email/email.module';


@Module({
  imports: [TypeOrmModule.forFeature([Admin,Manager,Announcement]),AuthModule,EmailModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}