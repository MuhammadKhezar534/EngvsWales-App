import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        teamType: String,
        isCaptain: { type: Boolean, default: false },
        playerBio: String,
        homeCourse: String,
        favouriteClub: String,
        favouriteCourse: String,
        dgaEvents: Number,
        topTenFinishes: Number,
        profileImage: String,
    },
    { timestamps: true },
);

