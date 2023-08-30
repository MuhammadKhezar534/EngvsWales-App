import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { PlayerModule } from './modules/player/player.module';
import { GameModule } from './modules/Game/game.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot("mongodb+srv://admin:hQfZiGRj5dVSLrzZ@atlascluster.or52cie.mongodb.net/golf-pwa"),
    AuthModule,
    UserModule,
    PlayerModule,
    GameModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }


