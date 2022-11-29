import { Module } from '@nestjs/common';
import { LearningDevelopmentService } from './learning_development.service';
import { LearningDevelopmentController } from './learning_development.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  LearningDevelopment,
  LearningDevelopmentSchema,
} from './entities/learning_development.entity';
import { LearningDevelopmentResponseHandler } from 'src/_utils/response_handler/learning_development_handler.response';
import { LearningDevelopmentRepository } from 'src/_repositories/learning_developments/learning_developments.repository';
import { AggregateLeaveRequest } from 'src/_aggregates/leave_request.aggregate';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: LearningDevelopment.name,
        schema: LearningDevelopmentSchema,
      },
    ]),
  ],
  controllers: [LearningDevelopmentController],
  providers: [
    LearningDevelopmentService,
    AggregateLeaveRequest,
    LearningDevelopmentResponseHandler,
    LearningDevelopmentRepository,
  ],
})
export class LearningDevelopmentModule {}
