import { Module } from '@nestjs/common';
import { OBRequestService } from './ob_request.service';
import { OBRequestController } from './ob_request.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ValidatorsModule } from 'src/validators/validators.module';
import { OBRequest, OBRequestSchema } from './entities/ob_request.entity';
import { ValidatorsService } from 'src/validators/validators.service';
import { AggregateOBRequest } from 'src/_aggregates/ob_request.aggregate';
import { OBRequestRepository } from 'src/_repositories/ob_request/ob_request.repository';
import { OBRequestResponseHandler } from 'src/_utils/response_handler/ob_request_handler.response';

@Module({
  imports: [
    ValidatorsModule,
    MongooseModule.forFeature([
      {
        name: OBRequest.name,
        schema: OBRequestSchema,
      },
    ]),
  ],
  controllers: [OBRequestController],
  providers: [
    OBRequestService,
    ValidatorsService,
    AggregateOBRequest,
    OBRequestRepository,
    OBRequestResponseHandler,
  ],
})
export class OBRequestModule {}
