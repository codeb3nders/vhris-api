import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LeaveRequestDocument = Leave_request & Document;

@Schema()
export class Leave_request {
  @Prop({ required: [true, 'leaveRequestNo is required!'] })
  leaveRequestNo: string;
  @Prop()
  employeeNo: string;
  @Prop({default: new Date()})
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
  @Prop()
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

export const LeaveRequestSchema = SchemaFactory.createForClass(Leave_request);

