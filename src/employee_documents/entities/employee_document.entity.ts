import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeDocumentsDocument = EmployeeDocument & Document;

@Schema()
export class EmployeeDocument {
  @Prop({ required: true, default: Date.now() })
  timeStamp: number;

  @Prop({ required: true })
  employeeNo: string;

  @Prop({ unique: true, required: true })
  documentType: string;

  @Prop({ required: true })
  dateUploaded: string;

  @Prop({ required: true })
  url: string;

  @Prop()
  remarks: string;
}

export const EmployeeDocumentSchema =
  SchemaFactory.createForClass(EmployeeDocument);
