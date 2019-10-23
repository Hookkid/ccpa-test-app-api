import { Repository, EntityRepository } from 'typeorm';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
const fetch = require('node-fetch');
import { User } from './user.entity';
import { AuthSignupDto } from './dto/auth-signup.dto';
import { AuthSigninDto } from './dto/auth-signin.dto';
import { AuthSignoutDto } from './dto/auth-signout.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(AuthSignupDto: AuthSignupDto): Promise<object> {
    const { username, password, email, firstName, lastName } = AuthSignupDto;
    const user = new User();
    user.username = username;
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.optedOut = true;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    
    try {
      const url = `http://localhost:3080/endpoints/privacy-rights/v1?email=${user.email}`;
      const getOptedOutData = async url => {
        try {
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'bearer test'
            }});
          const json = await response.json();
          user.optedOut = json.opted_out;
          await user.save();
        } catch (error) {
          console.log(error);
        }
      };
      await getOptedOutData(url);

      return { message: 'ok' }
    } catch (error) {
      if (error.code === '23505') { // duplicate username
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(AuthSigninDto: AuthSigninDto): Promise<{ email: string, id: number, firstName: string, lastName: string, optedOut: boolean }> {
    const { email, password } = AuthSigninDto;
    const user = await this.findOne({ email });

    const url = `http://localhost:3080/endpoints/privacy-rights/v1?email=${user.email}`;
    const getOptedOutData = async url => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer test'
          }});
        const json = await response.json();
        user.optedOut = json.opted_out;
        await user.save();
      } catch (error) {
        console.log(error);
      }
    };
    await getOptedOutData(url);
    if (user && await user.validatePassword(password)) {
      return { email: user.email, id: user.id, firstName: user.firstName, lastName: user.lastName, optedOut: user.optedOut };
    } else {
      return null;
    }
  }

  async signOut(AuthSignoutDto: AuthSignoutDto): Promise<string> {
    const { email } = AuthSignoutDto;
    const user = await this.findOne({ email });

    return user ? null : user.email;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
