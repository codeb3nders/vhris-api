import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { uuid } from 'src/_utils/data/uuid';

export type OvertimeRequestDocument = OvertimeRequest & Document;

@Schema({ collection: 'overtime_request' })
export class OvertimeRequest {
  @Prop({ required: true, default: uuid })
  id: string;

  @Prop()
  timestamp: number;
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
  disapprovalReason: string;
}

export const OvertimeRequestSchema =
  SchemaFactory.createForClass(OvertimeRequest);
