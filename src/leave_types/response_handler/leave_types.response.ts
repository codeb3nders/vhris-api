import { Leave_types } from '../entities/leave_types.entity';

export const LeaveTypesResponseHandler = {
  ok: (data: Leave_types[]) => {
    return data;
  },
};
