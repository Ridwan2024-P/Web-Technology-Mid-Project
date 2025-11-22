import { IsString, IsEmail, IsOptional } from 'class-validator';

export class ManagerDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  status?: string;

adminId: number;
}
