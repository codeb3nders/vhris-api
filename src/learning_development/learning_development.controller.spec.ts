import { Test, TestingModule } from '@nestjs/testing';
import { LearningDevelopmentController } from './learning_development.controller';
import { LearningDevelopmentService } from './learning_development.service';

describe('LearningDevelopmentController', () => {
  let controller: LearningDevelopmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LearningDevelopmentController],
      providers: [LearningDevelopmentService],
    }).compile();

    controller = module.get<LearningDevelopmentController>(LearningDevelopmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
