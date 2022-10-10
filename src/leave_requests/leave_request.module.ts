import { Module } from '@nestjs/common';
import { LeaveRequestService } from './leave_request.service';
import { LeaveRequestController } from './leave_request.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Leave_request,
  LeaveRequestSchema,
} from './entities/leave_request.entity';
import { LeaveRequestResponseHandler } from 'src/response_handler/leave_request_handler.response';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Leave_request.name,
        schema: LeaveRequestSchema,
      },
    ]),
  ],
  controllers: [LeaveRequestController],
  providers: [LeaveRequestService, LeaveRequestResponseHandler],
})
export class LeaveRequestModule {}
