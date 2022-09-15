import { Module } from '@nestjs/common';
import { LearningDevelopmentService } from './learning_development.service';
import { LearningDevelopmentController } from './learning_development.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  LearningDevelopment,
  LearningDevelopmentSchema,
} from './entities/learning_development.entity';

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
  providers: [LearningDevelopmentService],
})
export class LearningDevelopmentModule {}
