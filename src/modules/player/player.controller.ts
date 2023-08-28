import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { playerDTO } from "./dto/player.dto";
import { PlayerService } from "./player.service";
import { JwtAuthGuard } from "../auth/guards/jwt.auth.guard";

@UseGuards(JwtAuthGuard)
@Controller('player')
export class PlayerController {
    constructor(private playerService: PlayerService) { }

    @Get()
    async fetchPlayer(
        @Query('teamType') teamType,
    ) {
        const player = await this.playerService.getAllPlayerList(teamType)
        return player
    }

    @Post()
    async addPlayer(@Body() playerDTO: playerDTO) {
        const player = await this.playerService.addPlayer(playerDTO)
        return player
    }
}