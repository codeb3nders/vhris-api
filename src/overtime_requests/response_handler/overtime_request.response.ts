import { Overtime_request } from "../entities/overtime_request.entity";

export const OvertimeRequestResponseHandler = {
  ok: (data: Overtime_request[]) => {
   return data
  },
};
