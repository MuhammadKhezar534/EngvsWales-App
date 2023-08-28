import { IsString, IsEmail, IsNotEmpty, IsIn, IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { TEAM } from 'src/shared/constants';

export class playerDTO {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(Object.values(TEAM))
    teamType: string;

    @IsBoolean()
    @IsOptional()
    isCaptain: boolean

    @IsString()
    @IsOptional()
    playerBio: string

    @IsString()
    @IsOptional()
    homeCourse: string

    @IsString()
    @IsOptional()
    favouriteClub: string

    @IsString()
    @IsOptional()
    favouriteCourse: string

    @IsNumber()
    @IsOptional()
    dgaEvents: number

    @IsNumber()
    @IsOptional()
    topTenFinishes: number

    @IsString()
    @IsOptional()
    profileImage: string

}
