import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EnumsTableDocument = EnumsTable & Document;

@Schema({ collection: 'enums_table', strict: false })
export class EnumsTable {
  @Prop({ required: true, unique: true })
  code: string;
  @Prop({ required: true })
  type: string;
}

export const EnumsTableSchema = SchemaFactory.createForClass(EnumsTable);
