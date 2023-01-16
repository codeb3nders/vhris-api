import { CreateTeamLeaderDto } from 'src/team_leaders/dto/create-team_leader.dto';
import { BaseResponseHandler } from './base_handler.response';

export class TeamLeaderResponseHandler extends BaseResponseHandler {
  ok(data: CreateTeamLeaderDto | CreateTeamLeaderDto[]) {
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
      id: item.id,
      timestamp: item.timestamp,
      employeeNo: item.employeeNo,
      isDelegated: item.isDelegated,
      startDate: item.startDate,
      isActive: item.isActive,
      remarks: item.remarks,
      employeeDetails:
        item.employeeDetails.length > 0 ? item.employeeDetails[0] : null,
    };

    return toReturn;
  };
}
