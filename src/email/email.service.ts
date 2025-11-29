import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer';
import { ConfigService } from "@nestjs/config";
import { sentEmailDto } from "./email.dto";

@Injectable()
export class EmailService {
    constructor(private readonly configService: ConfigService) {}
    emailTransporter()  {
        const transporter = nodemailer.createTransport({
            host: this.configService.get<string>('Email_Host'),
            port: this.configService.get<number>('Port'),
            secure: false,
            auth: {
                user: this.configService.get<string>('Email_User'),
                pass: this.configService.get<string>('Email_Pass'),
            },
        });
        return transporter;
    }
    async sendEmail(dto:sentEmailDto){  
        const {recipients,subject,text}=dto;
        const transporter=this.emailTransporter();
        const options : nodemailer.SendMailOptions = {
            from: this.configService.get<string>('Email_User'),
            to: recipients,
            subject : subject,
            html : dto.html,
            text : text,
        };
      try {
        const info = await transporter.sendMail(options);
        console.log('Email sent: ' + info.response);
        return {message: 'Email sent successfully'};
      } catch (error) {
        console.error('Error sending email: ' + error);
        return {message: 'Failed to send email', error: error.message};
      }
    }
}