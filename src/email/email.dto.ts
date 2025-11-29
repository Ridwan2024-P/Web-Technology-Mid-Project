import { IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsString } from "class-validator";
export class sentEmailDto {
    @IsEmpty({})  
    recipients: string;
    @IsString()
    subject: string;
    @IsString()
    html: string;
    @IsOptional()
    @IsString()
    text?: string;
}