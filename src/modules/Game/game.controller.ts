import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { GameService } from "./game.service";
import { gameDTO, updateGameDto } from "./dto/game.dto";
import { JwtAuthGuard } from "../auth/guards/jwt.auth.guard";

@UseGuards(JwtAuthGuard)
@Controller('game')
export class GameController {
    constructor(private gameService: GameService) { }

    @Get()
    async fetchGame(
        @Query('gameType') gameType,
    ) {
        const player = await this.gameService.getAllGameList(gameType)
        return player
    }

    @Post()
    async addGame(@Body() gameDTO: gameDTO) {
        const game = await this.gameService.addGame(gameDTO)
        return game
    }

    @Put()
    async updateScoreOfGame(@Query('gameId') gameId, @Body() updateGameDto: updateGameDto) {
        const game = await this.gameService.updateScore(gameId, updateGameDto)
        return game
    }
}

