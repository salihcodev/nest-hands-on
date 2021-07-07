import * as bcrypt from 'bcrypt';
import { authErrorsCodes } from './../../../constants/main';
import { AuthCredentialDto } from './../../dtos/auth/auth.credential.dto';
import { UserEntity } from '../../entities/user/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async signup(authCredentials: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentials;

    const user = new UserEntity();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save(); // if it issued by the @unique entity decorator.
      // catch gonna handle the exception.
    } catch (error) {
      if (error.code === authErrorsCodes.duplicatedUser) {
        throw new ConflictException(
          `Username @${username} is already registered.`,
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    authCredentialDto: AuthCredentialDto,
  ): Promise<string> {
    const { username, password } = authCredentialDto;
    const user = await this.findOne({ username });

    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
