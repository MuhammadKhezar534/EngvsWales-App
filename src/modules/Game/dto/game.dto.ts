import { IsString, IsEmail, IsNotEmpty, IsIn, IsBoolean, IsNumber, IsOptional, IsArray, IsMongoId } from 'class-validator';
import mongoose from 'mongoose';
import { GAME_TYPES, TEAM } from 'src/shared/constants';

export class gameDTO {
    @IsString()
    @IsNotEmpty()
    @IsIn(Object.values(GAME_TYPES))
    gameType: string;

    @IsArray()
    @IsString({ each: true })
    northPlayers: string[];

    @IsArray()
    @IsString({ each: true })
    southPlayers: string[];

    @IsString()
    @IsOptional()
    northScore: string;

    @IsString()
    @IsOptional()
    southScore: string;

}



export class updateGameDto {

    @IsString()
    @IsOptional()
    northScore: string;

    @IsString()
    @IsOptional()
    southScore: string;
}