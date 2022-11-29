import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  TeamLeaderDocument,
  TeamLeader,
} from 'src/team_leaders/entities/team_leader.entity';
import { AggregateTeamLeader } from 'src/_aggregates/team_leader.aggregate';

import { EntityRepository } from '../entity.repository';

@Injectable()
export class TeamLeaderRepository extends EntityRepository<TeamLeaderDocument> {
  constructor(
    @InjectModel(TeamLeader.name)
    teamLeaderModel: Model<TeamLeaderDocument>,
    aggregateQry: AggregateTeamLeader,
  ) {
    super(teamLeaderModel, aggregateQry);
  }
}
