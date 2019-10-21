import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthSignupDto } from './dto/auth-signup.dto';
import { AuthSigninDto } from './dto/auth-signin.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) authSignupDto: AuthSignupDto): Promise<object> {
    return this.authService.signUp(authSignupDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) authSigninDto: AuthSigninDto): Promise<{ accessToken: string, user: { email: string, id: number, firstName: string, lastName: string, optedOut: boolean } }> {
    return this.authService.signIn(authSigninDto);
  }

  @Post('/signout')
  signOut(@Body(ValidationPipe) authSigninDto: AuthSigninDto): Promise<{ email: string }> {
    return this.authService.signOut(authSigninDto);
  }
}
