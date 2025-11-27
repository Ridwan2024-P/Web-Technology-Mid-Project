import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Admin } from "src/Admin/admin.entity";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<Omit<Admin, 'password'> | null> {
    const admin = await this.adminRepository.findOne({ where: { email } });
    if (admin && admin.password === pass) {
      const { password, ...result } = admin     ;
      return result;
    }
    return null;
  }

  async login(admin: Admin) {
    const payload = { email: admin.email, sub: admin.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
