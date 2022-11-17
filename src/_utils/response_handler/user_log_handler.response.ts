import { CreateUserLogDto } from 'src/user_logs/dto/create-user_log.dto';
import { BaseResponseHandler } from './base_handler.response';

export class UserLogResponseHandler extends BaseResponseHandler {
  ok(data: CreateUserLogDto | CreateUserLogDto[]) {
    if (Array.isArray(data) && data.length > 0) {
      return data.map((item: any) => {
        return this.returnItem(item, this.items(item));
      });
    } else {
      return this.returnItem(data, this.items(data));
    }
  }
  private items = (item: any) => {
    const toReturn: any = {
      portal: item.portal,
      employeeNo: item.employeeNo,
      module: item.module,
      event: item.event,
      details: item.details,
      ip_address: item.ip_address,
      user_agent: item.user_agent,
      employeeDetails: item.employeeDetails,
    };

    return toReturn;
  };
}
