import { UserEntity } from './../../../utilities/entities/user/user.entity';
import { JwtPayload } from './../../../../dist/utilities/interfaces/jwt-payload.interface.d';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from 'src/utilities/repositories/user/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'theSecret',
    });
  }

  async validate(payload: JwtPayload): Promise<UserEntity> {
    const { username } = payload;

    const user = await this.userRepository.findOne({ username });

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
