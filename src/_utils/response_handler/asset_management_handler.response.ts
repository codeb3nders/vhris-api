import { CreateAssetManagementDto } from 'src/asset_management/dto/create-asset_management.dto';
import { CreateCompanyAssetDto } from 'src/asset_management/dto/create-company_asset.dto';
import { BaseResponseHandler } from './base_handler.response';

export class AssetManagementResponseHandler extends BaseResponseHandler {
  assetManagement(data: CreateAssetManagementDto | CreateAssetManagementDto[]) {
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
    const assignedTo = item.assignedTo;

    const toReturn: any = {
      id: item.id,
      timestamp: item.timestamp,
      assetName: item.assetName,
      assetType: this.prepareEnumItem(item.assetTypeEnum),
      assetDetails: item.assetDetails,
      assetSerialNumber: item.assetSerialNumber,
      status: item.status,
    };

    const f = () => {
      const res = assignedTo.map((assigned) => {
        const employee = item.employee
          .filter((e: any) => e.employeeNo === assigned.employeeNo)
          .pop();

        const { firstName: fn, lastName: ln } = employee;

        return {
          employeeNo: assigned.employeeNo,
          name: `${ln}, ${fn}`,
          companyAssetId: assigned.companyAssetId,
          dateAssigned: assigned.dateAssigned,
          dateReturned: assigned.dateReturned,
          remarks: assigned.remarks,
          id: assigned.id,
        };
      });

      res.sort((a, b) => b.dateAssigned - a.dateAssigned);

      return res[0];
    };

    if (assignedTo) {
      toReturn.assignedTo = f();
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
      conditionAssigned: item.conditionAssigned,
      conditionReturned: item.conditionReturned,
      dateAssigned: item.dateAssigned,
      dateReturned: item.dateReturned,
      remarks: item.remarks,
      assetDetails: itemDetails,

      status: item.status,
    };

    return toReturn;
  };
}
