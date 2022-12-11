import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { uuid } from 'src/_utils/data/uuid';

export type OvertimeRequestDocument = OvertimeRequest & Document;

@Schema({ collection: 'overtime_request' })
export class OvertimeRequest {
  @Prop({ required: true, default: uuid })
  id: string;

  @Prop({ required: true, default: Date.now() })
  timestamp: Date;

  @Prop()
  employeeNo: string;

  @Prop()
  date: Date;

  @Prop()
  timeFrom: string;

  @Prop()
  timeTo: string;

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
  OTreasonOfDisapproval: string;

  @Prop()
  dateTimeApproved: Date;

  @Prop()
  approvedBy: string;

  @Prop()
  CLid: string;

  @Prop({ default: null })
  CLapproved: boolean | null;
}

export const OvertimeRequestSchema =
  SchemaFactory.createForClass(OvertimeRequest);
