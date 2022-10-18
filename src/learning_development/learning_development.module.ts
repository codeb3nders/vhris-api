import { Module } from '@nestjs/common';
import { LearningDevelopmentService } from './learning_development.service';
import { LearningDevelopmentController } from './learning_development.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  LearningDevelopment,
  LearningDevelopmentSchema,
} from './entities/learning_development.entity';
import { LearningDevelopmentResponseHandler } from 'src/_utils/response_handler/learning_development_handler.response';

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
  providers: [LearningDevelopmentService, LearningDevelopmentResponseHandler],
})
export class LearningDevelopmentModule {}
