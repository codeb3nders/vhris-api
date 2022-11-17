import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { uuid } from 'src/_utils/data/uuid';

export type UserLogDocument = UserLog & Document;

@Schema({ collection: 'user_logs' })
export class UserLog {
  @Prop({ required: true, default: uuid })
  id: string;

  @Prop({ default: Date.now() })
  timestamp: number;

  @Prop()
  portal: string;

  @Prop()
  employeeNo: string;

  @Prop()
  module: string;

  @Prop()
  event: string;

  @Prop()
  details: string;

  @Prop()
  ip_address: string;

  @Prop()
  user_agent: string;

  @Prop()
  lastModifiedDate?: Date;
}

export const UserLogSchema = SchemaFactory.createForClass(UserLog);
