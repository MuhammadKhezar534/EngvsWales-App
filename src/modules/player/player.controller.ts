import { Body, Controller, Get, NotFoundException, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { playerDTO } from "./dto/player.dto";
import { PlayerService } from "./player.service";
import { JwtAuthGuard } from "../auth/guards/jwt.auth.guard";

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

    @UseGuards(JwtAuthGuard)
    @Post()
    async addPlayer(@Body() playerDTO: playerDTO) {
        const player = await this.playerService.addPlayer(playerDTO)
        return player
    }

    @UseGuards(JwtAuthGuard)
    @Get('single/:id')
    async getPlayer(@Param('id') playerId) {
        const player = await this.playerService.getPlayer(playerId)
        return player
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async updatePlayer(
        @Query('id') playerId,
        @Body() playerDTO: playerDTO,
    ) {
        const player = await this.playerService.updatePlayer(playerId, playerDTO);
        if (!player) throw new NotFoundException('Player does not exist!');
        return player;
    }
}