import { Module } from '@nestjs/common';
import { LeaveRequestService } from './leave_request.service';
import { LeaveRequestController } from './leave_request.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  LeaveRequest,
  LeaveRequestSchema,
} from './entities/leave_request.entity';
import { LeaveRequestResponseHandler } from 'src/_utils/response_handler/leave_request_handler.response';
import { ValidatorsService } from 'src/validators/validators.service';
import { ValidatorsModule } from 'src/validators/validators.module';
import { AggregateLeaveRequest } from 'src/_aggregates/leave_request.aggregate';
import { LeaveRequestRepository } from 'src/_repositories/leave_request/leave_request.repository';

@Module({
  imports: [
    ValidatorsModule,
    MongooseModule.forFeature([
      {
        name: LeaveRequest.name,
        schema: LeaveRequestSchema,
      },
    ]),
  ],
  controllers: [LeaveRequestController],
  providers: [
    LeaveRequestService,
    ValidatorsService,
    AggregateLeaveRequest,
    LeaveRequestRepository,
    LeaveRequestResponseHandler,
  ],
})
export class LeaveRequestModule {}
