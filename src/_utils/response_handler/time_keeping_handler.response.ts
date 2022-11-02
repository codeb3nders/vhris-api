import { CreateCompanyAssetDto } from 'src/asset_management/dto/create-company_asset.dto';
import { CreateTimeKeepingDto } from 'src/time_keeping/dto/create-time_keeping.dto';
import { BaseResponseHandler } from './base_handler.response';

export class TimeKeepingResponseHandler extends BaseResponseHandler {
  assetManagement(data: CreateTimeKeepingDto | CreateTimeKeepingDto[]) {
    if (Array.isArray(data) && data.length > 0) {
      return data.map((item: any) => {
        return this.returnItem(item, this.assetManagementItems(item));
      });
    } else {
      return this.returnItem(data, this.assetManagementItems(data));
    }
  }
  companyAsset(data: CreateCompanyAssetDto | CreateCompanyAssetDto[]) {
    if (Array.isArray(data) && data.length > 0) {
      return data.map((item: any) => {
        return this.returnItem(item, this.companyAssetItems(item));
      });
    } else {
      return this.returnItem(data, this.companyAssetItems(data));
    }
  }

  private companyAssetItems = (item: any) => {
    const assignedTo = item.assignedTo.pop();
    const { firstName, lastName } = item;
    const ln = lastName.pop();
    const fn = firstName.pop();

    const toReturn: any = {
      id: item.id,
      timestamp: item.timestamp,
      assetName: item.assetName,
      assetType: this.prepareEnumItem(item.assetTypeEnum),
      assetDetails: item.assetDetails,
      assetSerialNumber: item.assetSerialNumber,
      status: item.status,
    };

    if (assignedTo) {
      toReturn.assignedTo = {
        employeeNo: assignedTo.employeeNo,
        name: `${ln} ${fn}`,
        companyAssetId: assignedTo.companyAssetId,
        dateAssigned: assignedTo.dateAssigned,
        dateReturned: assignedTo.dateReturned,
        remarks: assignedTo.remarks,
        id: assignedTo.id,
      };
    }

    return toReturn;
  };

  private assetManagementItems = (item: any) => {
    const itemDetails = item.details[0];

    const toReturn: any = {
      id: item.id,
      timestamp: item.timestamp,
      lastModifiedDate: item.lastModifiedDate,
      employeeNo: item.employeeNo,
      companyAssetId: item.companyAssetId,
      dateAssigned: item.dateAssigned,
      dateReturned: item.dateReturned,
      remarks: item.remarks,
      assetDetails: {
        name: itemDetails?.assetName,
        type: itemDetails?.assetType,
        details: itemDetails?.assetDetails,
        serialNumber: itemDetails?.assetSerialNumber,
        status: itemDetails?.status,
      },

      status: item.status,
    };

    return toReturn;
  };
}
