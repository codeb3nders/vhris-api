import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EnumTableDocument = Enum_Table & Document;

@Schema({ strict: false })
export class Enum_Table {
  @Prop({ required: true, unique: true })
  code: string;
  @Prop({ required: true })
  type: string;
}

export const EnumTableSchema = SchemaFactory.createForClass(Enum_Table);
