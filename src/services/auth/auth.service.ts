import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from 'src/utilities/dtos/auth/auth.credential.dto';
import { JwtPayload } from 'src/utilities/interfaces/jwt.payload.interface';
import { UserRepository } from 'src/utilities/repositories/user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signup(authCredentials: AuthCredentialDto): Promise<void> {
    return this.userRepository.signup(authCredentials);
  }

  async signin(
    authCredentials: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validateUserPassword(
      authCredentials,
    );

    if (!username) throw new UnauthorizedException('Invalid credentials!');

    const jwtPayload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(jwtPayload);

    return { accessToken };
  }
}
