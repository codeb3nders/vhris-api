import { Module } from '@nestjs/common';
import { OvertimeRequestService } from './overtime_requests.service';
import { OvertimeRequestController } from './overtime_requests.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  OvertimeRequestSchema,
  OvertimeRequest,
} from './entities/overtime_request.entity';
import { OvertimeRequestResponseHandler } from 'src/_utils/response_handler/overtime_request_handler.response';
import { OvertimeRequestRepository } from 'src/_repositories/overtime_request/overtime_request.repository';
import { AggregateOvertimeRequest } from 'src/_aggregates/overtime_request.aggregate';
import { ValidatorsService } from 'src/validators/validators.service';
import { ValidatorsModule } from 'src/validators/validators.module';

@Module({
  imports: [
    ValidatorsModule,
    MongooseModule.forFeature([
      {
        name: OvertimeRequest.name,
        schema: OvertimeRequestSchema,
      },
    ]),
  ],
  controllers: [OvertimeRequestController],
  providers: [
    OvertimeRequestService,
    ValidatorsService,
    AggregateOvertimeRequest,
    OvertimeRequestRepository,
    OvertimeRequestResponseHandler,
  ],
})
export class OvertimeRequestsModule {}
