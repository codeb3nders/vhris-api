import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OvertimeRequestDocument = Overtime_request & Document;

@Schema()
export class Overtime_request {
  @Prop()
  timeStamp: string;
  @Prop({ required: [true, 'overtimeRequestNo is required!'] })
  overtimeRequestNo: string;
  @Prop()
  employeeNo: string;
  @Prop()
  dateTimeFrom: Date;
  @Prop()
  dateTimeTo: Date;
  @Prop()
  isEarlyOt: boolean;
  @Prop()
  reason: string;
  @Prop()
  isLessBreak: boolean;
  @Prop()
  isPlusDay: boolean;
  @Prop()
  otStatus: string;
  @Prop()
  isApprove: boolean;
  @Prop()
  date: Date;
  @Prop()
  disapprovalReason: string;
}

export const OvertimeRequestSchema =
  SchemaFactory.createForClass(Overtime_request);
