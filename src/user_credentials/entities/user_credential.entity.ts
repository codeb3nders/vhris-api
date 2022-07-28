import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserCredentialDocument = User_credential & Document;

@Schema({ strict: false })
export class User_credential {
  @Prop({ required: true, unique: true })
  employeeNo: string;
  @Prop({ default: Date.now() })
  timeStamp: Date;
}

export const UserCredentialSchema =
  SchemaFactory.createForClass(User_credential);
