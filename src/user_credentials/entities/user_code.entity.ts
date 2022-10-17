import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserCodeDocument = UserCode & Document;

@Schema({ collection: 'user_codes' })
export class UserCode {
  @Prop({ required: true, unique: true })
  companyEmail: string;

  @Prop({ required: true })
  code: string;

  @Prop({ default: Date(), expires: 3120 })
  codeCreatedAt: Date;
}

export const UserCodeSchema = SchemaFactory.createForClass(UserCode);
