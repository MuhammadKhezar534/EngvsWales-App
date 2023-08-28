import { IsString, IsNotEmpty } from 'class-validator';

export class LoginUserDTO {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
