import { CreateOBRequestDto } from 'src/ob_request/dto/create-ob_request.dto';
import { BaseResponseHandler } from './base_handler.response';

export class OBRequestResponseHandler extends BaseResponseHandler {
  ok(data: CreateOBRequestDto | CreateOBRequestDto[]) {
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
      id: item.id,
      timestamp: item.timestamp,
      employeeNo: item.employeeNo,
      dateFrom: item.dateFrom,
      dateTo: item.dateTo,
      itineraryDetails: item.itineraryDetails,
      purpose: item.purpose,
      status: item.status,
      approver: item.approver,
      OBreasonOfDisapproval: item.OBreasonOfDisapproval,
      dateTimeApproved: item.dateTimeApproved,
      approvedBy: item.approvedBy,
      approverComments: item.approverComments,
      isWorkFromHome: item.isWorkFromHome,
      employeeDetails:
        item.employeeDetails.length > 0 ? item.employeeDetails[0] : null,
      approverDetails: item.approverDetails[0],
    };

    if (employee) {
      toReturn.employee = employee;
    }

    return toReturn;
  };
}
