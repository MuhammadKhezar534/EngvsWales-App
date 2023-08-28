import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDTO } from './dto/login-user.dto';
import { validate } from 'class-validator';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async validateUser(loginUserDto: LoginUserDTO): Promise<any> {
    const options = {
      validationError: {
        target: false,
        value: false,
      },
    };
    const errors = await validate(loginUserDto, options);

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    const data = await this.userService.findUserByEmail(loginUserDto.email);
    const user = JSON.parse(JSON.stringify(data));

    if (!user) {
      throw new BadRequestException('Invalid email or password!');
    }

    const isMatched = await compare(loginUserDto?.password, user?.password);

    if (!isMatched) {
      throw new BadRequestException('Invalid email or password!');
    }

    if (user) {
      return user;
    }
    return null;
  }
  async login(user: any) {
    const userInLoginFunc = await this.userService.findUserByEmail(user?.email);
    const payload = {
      user: userInLoginFunc?.email
    }
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
