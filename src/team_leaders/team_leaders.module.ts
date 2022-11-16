import { Module } from '@nestjs/common';
import { TeamLeadersService } from './team_leaders.service';
import { TeamLeadersController } from './team_leaders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamLeader, TeamLeaderSchema } from './entities/team_leader.entity';
import { TeamLeaderRepository } from 'src/_repositories/team_leaders/team_leader.repository';
import { AggregateTeamLeader } from 'src/_aggregates/team_leader.aggregate';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TeamLeader.name, schema: TeamLeaderSchema },
    ]),
  ],
  controllers: [TeamLeadersController],
  providers: [TeamLeadersService, TeamLeaderRepository, AggregateTeamLeader],
})
export class TeamLeadersModule {}
