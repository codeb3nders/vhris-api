import { Module } from '@nestjs/common';
import { OvertimeRequestsService } from './overtime_requests.service';
import { OvertimeRequestsController } from './overtime_requests.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  OvertimeRequestSchema,
  OvertimeRequest,
} from './entities/overtime_request.entity';
import { OvertimeRequestResponseHandler } from 'src/utils/response_handler/overtime_request_handler.response';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: OvertimeRequest.name,
        schema: OvertimeRequestSchema,
      },
    ]),
  ],
  controllers: [OvertimeRequestsController],
  providers: [OvertimeRequestsService, OvertimeRequestResponseHandler],
})
export class OvertimeRequestsModule {}
