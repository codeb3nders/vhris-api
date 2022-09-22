import { LeaveRequestResponseHandler } from 'src/leave_requests/response_handler/leave_request.response';
import { AssetManagement } from '../entities/asset_management.entity';

export const assetManagementResponseHandler = {
  ok: (data: AssetManagement[]) => {
    if (data.length > 0) {
      return data.map((item: any) => {
        return returnItem(item);
      });
    } else {
      return returnItem(data);
    }
  },
};

function returnItem(item) {
  const toReturn: any = {
    id: item._id,
    employeeNo: item.employeeNo,
    assetName: item.assetName,
    assetType: prepareEnumItem(item.assetTypeEnum),
    assetDetails: item.assetDetails,
    timestamp: item.timestamp,
    assetSerialNumber: item.assetSerialNumber,
    dateAssigned: item.dateAssigned,
    dateReturned: item.dateReturned,
    remarks: item.remarks,
  };

  return toReturn;
}

const prepareEnumItem = (item: any, isArray = false) => {
  if (!item || item.length < 1) return null;
  if (isArray) {
    return (
      item &&
      item.map((i: any) => {
        return { code: i.code, name: i.name };
      })
    );
  } else {
    const data =
      item &&
      item.map((i: any) => {
        return { code: i.code, name: i.name };
      });
    return data[0];
  }
};

function getReportToDetails(items: any) {
  if (!items || items.length < 1) {
    return null;
  }

  let item;
  if (Array.isArray(items)) {
    item = items[0];
  } else {
    item = items;
  }
  return {
    ...item,
    employeeName: `${item.firstName} ${item.lastName}`,
  };
}
