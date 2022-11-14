import { CreateTimeKeepingDto } from 'src/time_keeping/dto/create-time_keeping.dto';
import { BaseResponseHandler } from './base_handler.response';

export class TimeKeepingResponseHandler extends BaseResponseHandler {
  ok(data: CreateTimeKeepingDto | CreateTimeKeepingDto[]) {
    if (Array.isArray(data) && data.length > 0) {
      return data.map((item: any) => {
        return this.returnItem(item, this.items(item));
      });
    } else {
      return this.returnItem(data, this.items(data));
    }
  }
  private items = (item: any) => {
    return item;
  };
}
