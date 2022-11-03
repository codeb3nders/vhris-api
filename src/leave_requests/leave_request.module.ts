import { Module } from '@nestjs/common';
import { LeaveRequestService } from './leave_request.service';
import { LeaveRequestController } from './leave_request.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  LeaveRequest,
  LeaveRequestSchema,
} from './entities/leave_request.entity';
import { LeaveRequestResponseHandler } from 'src/_utils/response_handler/leave_request_handler.response';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: LeaveRequest.name,
        schema: LeaveRequestSchema,
      },
    ]),
  ],
  controllers: [LeaveRequestController],
  providers: [LeaveRequestService, LeaveRequestResponseHandler],
})
export class LeaveRequestModule {}
