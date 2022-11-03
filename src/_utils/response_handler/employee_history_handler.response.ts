import { CreateEmployeeHistoryDto } from 'src/employee_history/dto/create-employee_history.dto';
import { BaseResponseHandler } from './base_handler.response';

export class EmployeeHistoryResponseHandler extends BaseResponseHandler {
  ok(data: CreateEmployeeHistoryDto | CreateEmployeeHistoryDto[]) {
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
      type: item.type,
      details: this.prepareDetails(item),
    };

    if (employee) {
      toReturn.employee = employee;
    }

    return toReturn;
  };
}
