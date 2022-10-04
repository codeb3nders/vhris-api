import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DisciplinaryActionDocument = DisciplinaryAction & Document;

@Schema()
export class DisciplinaryAction {
  @Prop({ required: true, default: Date.now() })
  timestamp: number;

  @Prop({ required: true })
  employeeNo: string;

  @Prop()
  caseNumber: string;

  @Prop()
  violationCategory: string;

  @Prop()
  violations: string;

  @Prop()
  offenseStage: string;

  @Prop()
  offenseLevel: string;

  @Prop()
  misconductReportIssueDate: Date;

  @Prop()
  noticeToExplainIssueDate: Date;

  @Prop()
  explanationDate: Date;

  @Prop()
  finalDisposition: string;

  @Prop()
  dispositionDate: Date;

  @Prop()
  isAcknowledged: boolean;

  @Prop()
  dateAcknowledged: Date;

  @Prop()
  cleansingPeriod: string;

  @Prop()
  status: string;

  @Prop()
  lastModifiedDate?: Date;
}

export const DisciplinaryActionSchema =
  SchemaFactory.createForClass(DisciplinaryAction);