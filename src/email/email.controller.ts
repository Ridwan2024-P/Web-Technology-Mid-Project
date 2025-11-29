import { Controller,Post,Body } from "@nestjs/common";
import { EmailService } from "./email.service";
import { sentEmailDto } from "./email.dto";

@Controller('email')
export class EmailController {
 constructor(private readonly emailService: EmailService) {}
 @Post('send')
 async sendEmail(@Body() dto: sentEmailDto) {
    await this.emailService.sendEmail(dto);
    return {message: 'Request to send email received'};
 }
}