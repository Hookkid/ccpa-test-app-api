import { IsString, MinLength, MaxLength, Matches, IsEmail } from 'class-validator';

export class AuthSignupDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  firstName: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  lastName: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  // @Matches(
  //   /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
  //   { message: 'password too weak' },
  // )
  password: string;
}
