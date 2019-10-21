import { IsString, MinLength, MaxLength, Matches, IsEmail } from 'class-validator';

export class AuthSignoutDto {
  @IsString()
  @IsEmail()
  email: string;

}
