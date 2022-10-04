import { Test, TestingModule } from '@nestjs/testing';
import { DisciplinaryActionsController } from './disciplinary_actions.controller';
import { DisciplinaryActionsService } from './disciplinary_actions.service';

describe('DisciplinaryActionsController', () => {
  let controller: DisciplinaryActionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DisciplinaryActionsController],
      providers: [DisciplinaryActionsService],
    }).compile();

    controller = module.get<DisciplinaryActionsController>(DisciplinaryActionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
