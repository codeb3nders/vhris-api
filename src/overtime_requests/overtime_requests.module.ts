import { Module } from '@nestjs/common';
import { OvertimeRequestsService } from './overtime_requests.service';
import { OvertimeRequestsController } from './overtime_requests.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OvertimeRequestSchema, Overtime_request } from './entities/overtime_request.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Overtime_request.name,
        schema: OvertimeRequestSchema,
      },
    ]),
  ],
  controllers: [OvertimeRequestsController],
  providers: [OvertimeRequestsService]
})
export class OvertimeRequestsModule {}
