import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserCredentialDocument = User_credential & Document;

@Schema()
export class User_credential {
  @Prop({ required: true, unique: true })
  employeeNo: string;
  @Prop({ default: new Date().getTime() })
  timeStamp: number;
  @Prop({ required: true })
  password: string;
}

export const UserCredentialSchema =
  SchemaFactory.createForClass(User_credential);
