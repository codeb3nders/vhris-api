import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { uuid } from 'src/_utils/data/uuid';

export type TimeKeepingDocument = TimeKeeping & Document;

@Schema({ collection: 'time_keeping' })
export class TimeKeeping {
  @Prop({ required: true, default: uuid })
  id: string;

  @Prop({ required: true })
  employeeNo: string;

  @Prop({ required: true, default: Date.now() })
  timestamp: number;

  @Prop({ required: true })
  periodStartDate: Date;

  @Prop({ required: true })
  periodEndDate: Date;

  @Prop({ required: true })
  verificationDueDate: Date;

  @Prop({ required: true })
  employeeName: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  day: string;

  @Prop()
  holidayType: string;

  @Prop({ required: true })
  shift: string;

  @Prop()
  in1: string;

  @Prop()
  out1: string;

  @Prop()
  in2: string;

  @Prop()
  out2: string;

  @Prop()
  regHours: number;

  @Prop()
  lateMins: number;

  @Prop()
  utMins: number;

  @Prop()
  absentHrs: number;

  @Prop()
  otHrs: number;

  @Prop()
  ndiffHrs: number;

  @Prop()
  ndiffOTHrs: number;

  @Prop()
  remarks: string;

  @Prop()
  verified: string;

  @Prop()
  dateVerified: Date;

  @Prop()
  lastModifiedDate?: Date;
}

const TimeKeepingSchema = SchemaFactory.createForClass(TimeKeeping);

TimeKeepingSchema.index(
  {
    periodStartDate: 1,
    periodEndDate: 1,
    employeeName: 1,
  },
  { unique: true, background: true },
);

export { TimeKeepingSchema };
