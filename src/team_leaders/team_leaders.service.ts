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

  async findAll(_params?: any): Promise<TeamLeader[]> {
    return await this.teamLeaderRepository.aggregateFind(_params);
  }

  async findOne(id: string): Promise<TeamLeader> {
    return await this.teamLeaderRepository.findOne({ id });
  }

  async aggregateFindByAttribute(_params?: any): Promise<TeamLeader[]> {
    return this.teamLeaderRepository.aggregateFindByAttribute(_params);
  }

  async update(id: string, updateTeamLeaderDto: UpdateTeamLeaderDto) {
    return await this.teamLeaderRepository.findOneAndUpdate(
      { id },
      updateTeamLeaderDto,
    );
  }

  async remove(id: string) {
    return await this.teamLeaderRepository.deleteOne({ id });
  }
}
