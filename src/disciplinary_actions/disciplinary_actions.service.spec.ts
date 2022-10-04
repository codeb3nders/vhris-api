import { Test, TestingModule } from '@nestjs/testing';
import { DisciplinaryActionsService } from './disciplinary_actions.service';

describe('DisciplinaryActionsService', () => {
  let service: DisciplinaryActionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DisciplinaryActionsService],
    }).compile();

    service = module.get<DisciplinaryActionsService>(DisciplinaryActionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
