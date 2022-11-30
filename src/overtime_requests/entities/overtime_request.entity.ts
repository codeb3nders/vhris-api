import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { uuid } from 'src/_utils/data/uuid';

export type OvertimeRequestDocument = OvertimeRequest & Document;

@Schema({ collection: 'overtime_request' })
export class OvertimeRequest {
  @Prop({ required: true, default: uuid })
  id: string;

  @Prop({ required: true, default: Date.now() })
  timestamp: number;

  @Prop()
  employeeNo: string;

  @Prop()
  date: Date;

  @Prop()
  timeFrom: Date;

  @Prop()
  timeTo: Date;

  @Prop()
  earlyOT: string;

  @Prop()
  reason: string;

  @Prop()
  lessBreak: string;

  @Prop()
  plus1day: string;

  @Prop()
  approver: string;

  @Prop({ required: true, default: 'PENDING' })
  status: string;

  @Prop()
  totalOThrs: number;

  @Prop()
  OTreasonOfDisapproval: Date;

  @Prop()
  dateTimeApproved: Date;

  @Prop()
  approvedBy: string;

  @Prop()
  CLid: string;

  @Prop({ default: null })
  CLapproved: boolean | null;

  @Prop()
  employeeDetails: string;

  @Prop()
  approverDetails: string;
}

export const OvertimeRequestSchema =
  SchemaFactory.createForClass(OvertimeRequest);
