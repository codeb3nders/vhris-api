import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TeamLeaderDocument = TeamLeader & Document;

@Schema({ collection: 'team_leaders' })
export class TeamLeader {
  @Prop()
  id: string;

  @Prop()
  timestamp: number;

  @Prop()
  employeeNo: string;

  @Prop({ default: false })
  isDelegated: boolean;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  remarks: string;
}

export const TeamLeaderSchema = SchemaFactory.createForClass(TeamLeader);
