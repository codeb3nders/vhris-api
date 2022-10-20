import { ConfigService } from '@nestjs/config';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CONSTANTS } from 'src/_utils/constants/employees';

export type UserCodeDocument = UserCode & Document;

@Schema({ collection: 'user_codes' })
export class UserCode {
  @Prop({ required: true, unique: true })
  companyEmail: string;

  @Prop({ required: true })
  code: string;

  @Prop({ default: Date(), expires: CONSTANTS.TTL })
  codeCreatedAt: Date;
}

export const UserCodeSchema = SchemaFactory.createForClass(UserCode);
