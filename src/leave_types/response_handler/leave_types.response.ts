import { LeaveRequestResponseHandler } from 'src/leave_requests/response_handler/leave_request.response';
import { Leave_types } from '../entities/leave_types.entity';
import { LeaveTypesI } from '../interface/leave_types.interface';

export const LeaveTypesResponseHandler = {
  ok: (data: Leave_types[]) => {
    return data
  },
};
