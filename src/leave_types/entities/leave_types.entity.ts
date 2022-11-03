import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { uuid } from 'src/_utils/data/uuid';

export type LeaveTypesDocument = Leave_types & Document;

export class Leave_types {
  @Prop({ required: true, default: uuid })
  id: string;

  @Prop({ required: true, unique: true })
  typeId: string;
  @Prop()
  typeCode: string[];
  @Prop()
  typeName: string[];
}

export const LeaveTypesSchema = SchemaFactory.createForClass(Leave_types);
