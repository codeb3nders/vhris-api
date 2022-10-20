import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AssetManagementDocument = AssetManagement & Document;

@Schema({ collection: 'asset_managements' })
export class AssetManagement {
  @Prop({ required: true })
  employeeNo: string;

  @Prop({ default: Date.now() })
  timestamp: number;

  @Prop()
  assetName: string;

  @Prop()
  assetType: string;

  @Prop()
  assetDetails: string;

  @Prop()
  assetSerialNumber: string;

  @Prop()
  dateAssigned: Date;

  @Prop()
  dateReturned: Date;

  @Prop()
  remarks: string;

  @Prop()
  lastModifiedDate?: Date;
}

export const AssetManagementSchema =
  SchemaFactory.createForClass(AssetManagement);
