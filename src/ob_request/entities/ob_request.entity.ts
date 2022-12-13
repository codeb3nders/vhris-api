import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { uuid } from 'src/_utils/data/uuid';

export type OBRequestDocument = OBRequest & Document;

class ItineraryDetails {
  @Prop({ required: true, default: uuid })
  id: string;
  from: string;
  to: string;
  departureDateTime: Date;
  arrivalDateTime: Date;
}

@Schema({ collection: 'ob_request' })
export class OBRequest {
  @Prop({ required: true, default: uuid })
  id: string;

  @Prop({ required: true, default: Date.now() })
  timestamp: Date;

  @Prop()
  employeeNo: string;

  @Prop()
  dateFrom: Date;

  @Prop()
  dateTo: Date;

  @Prop()
  itineraryDetails: ItineraryDetails[];

  @Prop()
  isWorkFromHome: boolean;

  @Prop()
  purpose: string;

  @Prop()
  status: string;

  @Prop()
  approver: string;

  @Prop()
  OBreasonOfDisapproval: string;

  @Prop()
  dateTimeApproved: string;

  @Prop()
  approvedBy: string;

  @Prop()
  approverComments: string;
}

export const OBRequestSchema = SchemaFactory.createForClass(OBRequest);
