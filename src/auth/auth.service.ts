import { Injectable, UnauthorizedException, NotFoundException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
const request = require('request');
import { UserRepository } from './user.repository';
import { AuthSignupDto } from './dto/auth-signup.dto';
import { AuthSigninDto } from './dto/auth-signin.dto';
import { AuthSignoutDto } from './dto/auth-signout.dto';
import { JwtPayload } from './jwt-payload.interface';
import { User } from '../auth/user.entity';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async getUserByEmail(
    email: string,
  ): Promise<User> {
    const found = await this.userRepository.findOne({ where: { email } });

    if (!found) {
      throw new NotFoundException(`User with email "${email}" not found`);
    }

    return found;
  }

  async signUp(authSignupDto: AuthSignupDto): Promise<object> {
    return this.userRepository.signUp(authSignupDto);
  }

  async signIn(authSigninDto: AuthSigninDto): Promise<{ accessToken: string, user: { email: string, id: number, firstName: string, lastName: string, optedOut: boolean } }> {
    const user = await this.userRepository.validateUserPassword(authSigninDto);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { email: user.email };
    const accessToken = await this.jwtService.sign(payload);
    this.jwtService.sign(payload)
    this.logger.debug(`Generated JWT Token with payload ${JSON.stringify(payload)}`);

    return { accessToken, user };
  }

  async signOut(
    authSignoutDto: AuthSignoutDto
  ): Promise<{ email: string }> {
    const email = await this.userRepository.signOut(authSignoutDto);
    if (email) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { email: null };
  }
}
