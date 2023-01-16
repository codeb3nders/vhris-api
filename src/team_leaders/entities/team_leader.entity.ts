import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { uuid } from 'src/_utils/data/uuid';

export type TeamLeaderDocument = TeamLeader & Document;

@Schema({ collection: 'team_leaders' })
export class TeamLeader {
  @Prop({ required: true, default: uuid })
  id: string;

  @Prop({ default: Date.now() })
  timestamp: number;

  @Prop()
  employeeNo: string;

  @Prop({ default: false })
  isDelegated: boolean;

  @Prop()
  startDate: Date;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  remarks: string;
}

export const TeamLeaderSchema = SchemaFactory.createForClass(TeamLeader);
