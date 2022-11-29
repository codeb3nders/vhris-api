import { PartialType } from '@nestjs/swagger';
import { CreateTeamLeaderDto } from './create-team_leader.dto';

export class UpdateTeamLeaderDto extends PartialType(CreateTeamLeaderDto) {}
