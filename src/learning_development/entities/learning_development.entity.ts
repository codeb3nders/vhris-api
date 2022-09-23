import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LearningDevelopmentDocument = LearningDevelopment & Document;

@Schema()
export class LearningDevelopment {
  @Prop({ required: true, unique: true })
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
}

export const LearningDevelopmentSchema =
  SchemaFactory.createForClass(LearningDevelopment);
