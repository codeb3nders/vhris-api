import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EnumTableDocument = EnumsTable & Document;

@Schema({ collection: 'enums_table', strict: false })
export class EnumsTable {
  @Prop({ required: true, unique: true })
  code: string;
  @Prop({ required: true })
  type: string;
}

export const EnumTableSchema = SchemaFactory.createForClass(EnumsTable);
