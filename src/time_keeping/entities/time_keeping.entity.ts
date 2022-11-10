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

  @Prop({ type: JSON })
  details: {
    date: Date;

    day: string;

    holidayType: string;

    shift: string;

    in1: string;

    out1: string;

    in2: string;

    out2: string;

    regHours: number;

    lateMins: number;

    utMins: number;

    absentHrs: number;

    otHrs: number;

    ndiffHrs: number;

    ndiffOTHrs: number;

    remarks: string;

    verified: string;

    dateVerified: Date;
  };

  @Prop()
  lastModifiedDate?: Date;
}

const TimeKeepingSchema = SchemaFactory.createForClass(TimeKeeping);

// TimeKeepingSchema.index(
//   {
//     periodStartDate: 1,
//     periodEndDate: 1,
//     employeeName: 1,
//   },
//   { unique: true, background: true },
// );

export { TimeKeepingSchema };
