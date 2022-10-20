import { CreateAssetManagementDto } from 'src/asset_management/dto/create-asset_management.dto';
import { BaseResponseHandler } from './base_handler.response';

export class AssetManagementResponseHandler extends BaseResponseHandler {
  ok(data: CreateAssetManagementDto | CreateAssetManagementDto[]) {
    if (Array.isArray(data) && data.length > 0) {
      return data.map((item: any) => {
        return this.returnItem(item, this.items(item));
      });
    } else {
      return this.returnItem(data, this.items(data));
    }
  }
  private items = (item: any) => {
    const employee = item.employee;
    const toReturn: any = {
      assetName: item.assetName,
      assetType: this.prepareEnumItem(item.assetTypeEnum),
      assetDetails: item.assetDetails,
      timestamp: item.timestamp,
      assetSerialNumber: item.assetSerialNumber,
      dateAssigned: item.dateAssigned,
      dateReturned: item.dateReturned,
      remarks: item.remarks,
    };

    if (employee) {
      toReturn.employee = employee;
    }

    return toReturn;
  };
}
