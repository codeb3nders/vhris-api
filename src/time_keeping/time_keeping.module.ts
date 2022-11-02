import { Module } from '@nestjs/common';
import { TimeKeepingService } from './time_keeping.service';
import { TimeKeepingController } from './time_keeping.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TimeKeeping, TimeKeepingSchema } from './entities/time_keeping.entity';
import { TimeKeepingRepository } from 'src/_repositories/tike_keeping/time_keeping.repository';
import { TimeKeepingResponseHandler } from 'src/_utils/response_handler/time_keeping_handler.response';
import { AggregateTimeKeeping } from 'src/_aggregates/time_keeping.aggregate';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TimeKeeping.name,
        schema: TimeKeepingSchema,
      },
    ]),
  ],
  controllers: [TimeKeepingController],
  providers: [
    TimeKeepingService,
    TimeKeepingResponseHandler,
    TimeKeepingRepository,
    AggregateTimeKeeping,
  ],
})
export class TimeKeepingModule {}
