import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeHistoryController } from './employee_history.controller';
import { EmployeeHistoryService } from './employee_history.service';

describe('EmployeeHistoryController', () => {
  let controller: EmployeeHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeHistoryController],
      providers: [EmployeeHistoryService],
    }).compile();

    controller = module.get<EmployeeHistoryController>(
      EmployeeHistoryController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
