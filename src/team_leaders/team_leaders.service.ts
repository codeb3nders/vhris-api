import { Injectable } from '@nestjs/common';
import { TeamLeaderRepository } from 'src/_repositories/team_leaders/team_leader.repository';
import { CreateTeamLeaderDto } from './dto/create-team_leader.dto';
import { UpdateTeamLeaderDto } from './dto/update-team_leader.dto';
import { TeamLeader } from './entities/team_leader.entity';

@Injectable()
export class TeamLeadersService {
  constructor(private readonly teamLeaderRepository: TeamLeaderRepository) {}

  async create(createTeamLeaderDto: CreateTeamLeaderDto): Promise<TeamLeader> {
    return await this.teamLeaderRepository.create(createTeamLeaderDto);
  }

  findAll() {
    return `This action returns all teamLeaders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teamLeader`;
  }

  update(id: number, updateTeamLeaderDto: UpdateTeamLeaderDto) {
    return `This action updates a #${id} teamLeader`;
  }

  remove(id: number) {
    return `This action removes a #${id} teamLeader`;
  }
}
