import { Module } from '@nestjs/common';
import { LeaveRequestService } from './leave_request.service';
import { LeaveRequestController } from './leave_request.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Leave_request,
  LeaveRequestSchema,
} from './entities/leave_request.entity';

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
  providers: [LeaveRequestService],
})
export class LeaveRequestModule {}
