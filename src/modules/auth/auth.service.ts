import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { AuthenticateDto } from './dto/authenticate.dto';
import { UsersRepositories } from 'src/shared/database/repositories/users.repositories';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UsersRepositories,
    private readonly jwtService: JwtService
  ) {}

  async authenticate(authenticateDto: AuthenticateDto) {
    const { email, password } = authenticateDto;

    const user = await this.usersRepo.findUnique({
      where: { email },
      select: { id: true, email: true, password: true },
      
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }


    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, username: user.email };
    const accessToken = await this.jwtService.signAsync(payload)

    return {accessToken};
  }
}
