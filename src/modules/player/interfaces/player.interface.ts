import * as mongoose from "mongoose";

export interface Player {
    firstName: string,
    lastName: string,
    teamType: string,
    isCaptain: boolean,
    playerBio: string,
    homeCourse: string,
    favouriteClub: string,
    favouriteCourse: string,
    dgaEvents: number,
    topTenFinishes: number,
    profileImage: string,
    created_at: Date
}
