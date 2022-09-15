import { Test, TestingModule } from '@nestjs/testing';
import { LearningDevelopmentService } from './learning_development.service';

describe('LearningDevelopmentService', () => {
  let service: LearningDevelopmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LearningDevelopmentService],
    }).compile();

    service = module.get<LearningDevelopmentService>(LearningDevelopmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
