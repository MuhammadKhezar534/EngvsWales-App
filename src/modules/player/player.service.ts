import { Injectable } from "@nestjs/common";
import { Model } from 'mongoose';
import { Player } from "./interfaces/player.interface";
import { InjectModel } from '@nestjs/mongoose';
import { playerDTO } from "./dto/player.dto";

@Injectable()
export class PlayerService {
    constructor(@InjectModel('Player') private readonly playerModel: Model<Player>) { }
    async addPlayer(playerDTO: playerDTO): Promise<Player> {
        const player = new this.playerModel(playerDTO);
        await player.save();
        return player;
    }

    async getAllPlayerList(teamType): Promise<any> {
        const playerListing = await this.playerModel.find({ teamType })
        return playerListing
    }


}