import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { uuid } from 'src/_utils/data/uuid';

export type LeaveRequestDocument = LeaveRequest & Document;

@Schema({ collection: 'leave_request' })
export class LeaveRequest {
  @Prop({ required: true, default: uuid })
  id: string;

  @Prop({ required: [true, 'leaveRequestNo is required!'] })
  leaveRequestNo: string;
  @Prop()
  employeeNo: string;
  @Prop({ default: new Date() })
  timestamp: string;
  @Prop()
  leaveApplied: string;
  @Prop()
  dateTimeLeaveFirst: string;
  @Prop()
  dateTimeLeaveLast: string;
  @Prop()
  leaveDays: string;
  @Prop()
  returnToWorkDate: string;

  @Prop({ required: true, default: 'Vacation' })
  fieldLeaveReason: string;
  @Prop()
  immediateSupervisor: string;
  @Prop()
  applicationLeaveStatus: string;
  @Prop()
  disapprovalReason: string;
  @Prop()
  approvedDate: string;
  @Prop()
  disapprovedDate: string;
}

export const LeaveRequestSchema = SchemaFactory.createForClass(LeaveRequest);
