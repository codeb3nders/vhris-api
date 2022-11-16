import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeamLeadersService } from './team_leaders.service';
import { CreateTeamLeaderDto } from './dto/create-team_leader.dto';
import { UpdateTeamLeaderDto } from './dto/update-team_leader.dto';

@Controller('team-leaders')
export class TeamLeadersController {
  constructor(private readonly teamLeadersService: TeamLeadersService) {}

  @Post()
  create(@Body() createTeamLeaderDto: CreateTeamLeaderDto) {
    return this.teamLeadersService.create(createTeamLeaderDto);
  }

  @Get()
  findAll() {
    return this.teamLeadersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamLeadersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamLeaderDto: UpdateTeamLeaderDto) {
    return this.teamLeadersService.update(+id, updateTeamLeaderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamLeadersService.remove(+id);
  }
}
