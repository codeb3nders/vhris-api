import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { uuid } from 'src/_utils/data/uuid';

export type LearningDevelopmentDocument = LearningDevelopment & Document;

@Schema({ collection: 'learning_developments' })
export class LearningDevelopment {
  @Prop({ required: true, default: uuid })
  id: string;

  @Prop({ required: true })
  employeeNo: string;

  @Prop({ default: Date.now() })
  timestamp: number;

  @Prop()
  isAttended: boolean;

  @Prop()
  courseTitle: string;

  @Prop()
  institution: string;

  @Prop()
  venue: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  status: string;

  @Prop()
  bondLength: number;

  @Prop()
  bondStartDate: Date;

  @Prop()
  bondEndDate: Date;

  @Prop()
  lastModifiedDate?: number;
}

export const LearningDevelopmentSchema =
  SchemaFactory.createForClass(LearningDevelopment);
