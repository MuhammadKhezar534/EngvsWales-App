import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { gameDTO } from "./dto/game.dto";
import { Game } from "./interfaces/game.interface";

@Injectable()
export class GameService {
    constructor(@InjectModel('Game') private readonly gameModel: Model<Game>) { }
    async addGame(playerDTO: gameDTO): Promise<Game> {
        const game = new this.gameModel(playerDTO);
        await game.save();
        return game;
    }

    async getAllGameList(gameType): Promise<any> {
        const gameListing = await this.gameModel.find({ gameType })
        return gameListing
    }


    async updateScore(gameId, updateGameDto): Promise<any> {
        const game = await this.gameModel.findById({ _id: gameId })
        if (!game) {
            throw new NotFoundException('Game does not exist.')
        }


        game.northScore = updateGameDto.northScore
        game.southScore = updateGameDto.southScore

        await game.save()
        return game


    }
}