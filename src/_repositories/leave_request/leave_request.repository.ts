import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  LeaveRequestDocument,
  LeaveRequest,
} from 'src/leave_requests/entities/leave_request.entity';

import { EntityRepository } from '../entity.repository';

@Injectable()
export class LeaveRequestRepository extends EntityRepository<LeaveRequestDocument> {
  constructor(
    @InjectModel(LeaveRequest.name)
    leaveRequestModel: Model<LeaveRequestDocument>,
  ) {
    super(leaveRequestModel);
  }
}
