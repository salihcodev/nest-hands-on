import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from 'src/services/auth/auth.service';
import { AuthCredentialDto } from 'src/utilities/dtos/auth/auth.credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(
    @Body(ValidationPipe) authCredentials: AuthCredentialDto,
  ): Promise<void> {
    return this.authService.signup(authCredentials);
  }

  @Post('/signin')
  signin(
    @Body(ValidationPipe) authCredentials: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signin(authCredentials);
  }
}
