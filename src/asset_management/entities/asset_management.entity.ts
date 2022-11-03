import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { uuid } from 'src/_utils/data/uuid';

export type AssetManagementDocument = AssetManagement & Document;

@Schema({ collection: 'asset_managements' })
export class AssetManagement {
  @Prop({ required: true, default: uuid })
  id: string;

  @Prop({ required: true })
  employeeNo: string;

  @Prop({ default: Date.now() })
  timestamp: number;

  @Prop()
  companyAssetId: string;

  @Prop()
  conditionAssigned: string;

  @Prop()
  conditionReturned: string;

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
