import { Strategy } from 'passport-local';

import { PassportStrategy } from '@nestjs/passport';


import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

import { plainToClass } from 'class-transformer';
import { LoginUserDTO } from './dto/login-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {
    super({ usernameField: 'email' });
  }
  async validate(email: string, password: string): Promise<any> {
    const loginUserDto = plainToClass(LoginUserDTO, { email, password });
    const user = this.authService.validateUser(loginUserDto);
    if (!user) {
      throw new BadRequestException('Invalid email or password!');
    }
    return user;
  }
}
