import {
  Controller,
  Res,
  HttpStatus,
  Post,
  Body,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';

import { LoginUserDTO } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async userLogin(
    @Request() req,
    @Res() res,
    @Body() loginUserDto: LoginUserDTO,
  ) {

    const result = await this.authService.login(loginUserDto);

    if (!result) {
      throw new BadRequestException('Invalid email or password');
    }

    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      message: 'success',
      data: result || {},
    });
  }
}
