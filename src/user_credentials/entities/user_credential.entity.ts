import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { uuid } from 'src/_utils/data/uuid';

export type UserCredentialDocument = UserCredential & Document;

@Schema({ collection: 'user_credential' })
export class UserCredential {
  @Prop({ required: true, default: uuid })
  id: string;
  @Prop({ required: true, unique: true })
  employeeNo: string;
  @Prop({ default: new Date().getTime() })
  timestamp: number;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  accessGroup: string;
  @Prop({ default: true })
  isActive: boolean;
  @Prop()
  lastModifiedDate?: number;
}

export const UserCredentialSchema =
  SchemaFactory.createForClass(UserCredential);
