import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { uuid } from 'src/_utils/data/uuid';

export type LeaveRequestDocument = LeaveRequest & Document;

@Schema({ collection: 'leave_request' })
export class LeaveRequest {
  @Prop({ required: true, default: uuid })
  id: string;

  @Prop({ required: true })
  employeeNo: string;

  @Prop({ required: true })
  leaveType: string;

  @Prop()
  offsetOThrs: number;

  @Prop({ required: true })
  dateFrom: Date;

  @Prop({ required: true })
  dateTo: Date;

  @Prop({ required: true })
  noOfDays: number;

  @Prop({ required: true })
  dateOfReturnToWork: Date;

  @Prop({ required: true })
  reasonOfLeave: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  approver: string;

  @Prop()
  leaveReasonOfDisapproval: string;

  @Prop()
  dateTimeApproved: Date;

  @Prop()
  approvedBy: string;

  @Prop()
  lastModifiedDate?: Date;
}

export const LeaveRequestSchema = SchemaFactory.createForClass(LeaveRequest);
