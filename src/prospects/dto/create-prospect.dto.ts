import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateProspectDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  zipcode: string;

}
