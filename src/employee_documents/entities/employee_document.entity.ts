import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeDocumentDocument = EmployeeDocument & Document;

@Schema({ collection: 'employee_documents' })
export class EmployeeDocument {
  @Prop({ required: true, default: Date.now() })
  timestamp: number;

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

  @Prop()
  lastModifiedDate?: Date;
}

export const EmployeeDocumentSchema =
  SchemaFactory.createForClass(EmployeeDocument);
