import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserCredentialDocument = UserCredential & Document;

@Schema()
export class UserCredential {
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
