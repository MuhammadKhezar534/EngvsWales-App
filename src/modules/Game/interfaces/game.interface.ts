import * as mongoose from "mongoose";

export interface Game {
    gameType: string,
    northPlayers: Array<string>,
    southPlayers: Array<string>,
    northScore: string,
    southScore: string,
    created_at: Date
}
