import * as mongoose from 'mongoose';

export const GameSchema = new mongoose.Schema(
    {
        gameType: String,
        northPlayers: Array<String>,
        southPlayers: Array<String>,
        northScore: { type: String, default: "" },
        southScore: { type: String, default: "" },
    },
    { timestamps: true },
);

