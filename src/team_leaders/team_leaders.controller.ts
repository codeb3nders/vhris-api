import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TeamLeadersService } from './team_leaders.service';
import { CreateTeamLeaderDto } from './dto/create-team_leader.dto';
import { UpdateTeamLeaderDto } from './dto/update-team_leader.dto';
import { TeamLeader } from './entities/team_leader.entity';
import { TeamLeaderResponseHandler } from 'src/_utils/response_handler/team_leader_handler.response';

@Controller('team-leaders')
export class TeamLeadersController {
  constructor(
    private readonly teamLeadersService: TeamLeadersService,
    private readonly teamLeaderResponseHandler: TeamLeaderResponseHandler,
  ) {}

  @Post()
  async create(
    @Body() createTeamLeaderDto: CreateTeamLeaderDto,
  ): Promise<TeamLeader> {
    return await this.teamLeadersService.create(createTeamLeaderDto);
  }

  @Get()
  async findAll(@Query() params): Promise<TeamLeader[]> {
    const response = await this.teamLeadersService.findAll(params);
    if (!response || response.length < 1) {
      return response;
    }
    return this.teamLeaderResponseHandler.ok(response);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamLeadersService.findOne(id);
  }

  @Get('employee/:employeeNo')
  async findByAttribute(@Param('employeeNo') employeeNo: string) {
    const response = await this.teamLeadersService.aggregateFindByAttribute({
      employeeNo,
    });

    if (!response || response.length < 1) {
      return response;
    }
    return this.teamLeaderResponseHandler.ok(response);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTeamLeaderDto: UpdateTeamLeaderDto,
  ) {
    return this.teamLeadersService.update(id, updateTeamLeaderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamLeadersService.remove(id);
  }
}
