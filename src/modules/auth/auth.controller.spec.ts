import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LocalStrategy } from './local.strategy';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        UserService,
        AuthService,
        LocalStrategy,
        JwtService,
        { provide: getModelToken('User'), useValue: jest.fn() },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return JWT token if login is successful', async () => {
      const loginDto = {
        _id: '63e4e3293d7cc851414a751f',
        email: 'abid@gmail.com',
        password:
          '$2a$10$34Qt5aY45sFtPxpPwMiUluSwADtT14/TSRzYqqGhyAN/BTw34x4Fy',
      };
      const expectedToken = {
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiaWRAZ21haWwuY29tIiwiaWF0IjoxNjc4MzQ2MzY4LCJleHAiOjE2NzgzNDk5Njh9.-mg4CqCVS88MWutbQw6w5OHCyF16yMr0C39clU__NaM',
      };
      jest.spyOn(authService, 'login').mockResolvedValue({
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiaWRAZ21haWwuY29tIiwiaWF0IjoxNjc4MzQ2MzY4LCJleHAiOjE2NzgzNDk5Njh9.-mg4CqCVS88MWutbQw6w5OHCyF16yMr0C39clU__NaM',
      });

      expect(await authService.login(loginDto)).toEqual(expectedToken);
    });
    it('should throw an error on unsuccessful login', async () => {
      const email = 'abid@gmail.com';
      const password = '$2a$12$p7g/bL1tSZYQiyr5XR4bf';

      jest
        .spyOn(authService, 'login')
        .mockRejectedValueOnce(new Error('Bad Request Exception'));

      await expect(
        authService.validateUser({ email, password }),
      ).rejects.toThrowError('Bad Request Exception');
    });
  });
});
