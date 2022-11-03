import { ConfigService } from '@nestjs/config';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CONSTANTS } from 'src/_utils/constants/employees';
import { uuid } from 'src/_utils/data/uuid';

export type UserCodeDocument = UserCode & Document;

@Schema({ collection: 'user_codes' })
export class UserCode {
  @Prop({ required: true, default: uuid })
  id: string;

  @Prop({ required: true, unique: true })
  companyEmail: string;

  @Prop({ required: true })
  code: string;

  @Prop({ default: Date(), expires: Number(CONSTANTS.TTL) })
  codeCreatedAt: Date;
}

export const UserCodeSchema = SchemaFactory.createForClass(UserCode);
