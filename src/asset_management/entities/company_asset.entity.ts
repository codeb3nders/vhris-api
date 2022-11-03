import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { uuid } from 'src/_utils/data/uuid';

export type CompanyAssetDocument = CompanyAsset & Document;

@Schema({ collection: 'company_assets' })
export class CompanyAsset {
  @Prop({ required: true, default: uuid })
  id: string;

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
  status: string;

  @Prop()
  lastModifiedDate?: Date;
}

export const CompanyAssetSchema = SchemaFactory.createForClass(CompanyAsset);
