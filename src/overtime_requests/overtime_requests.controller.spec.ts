import { Test, TestingModule } from '@nestjs/testing';
import { OvertimeRequestsController } from './overtime_requests.controller';
import { OvertimeRequestsService } from './overtime_requests.service';

describe('OvertimeRequestsController', () => {
  let controller: OvertimeRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OvertimeRequestsController],
      providers: [OvertimeRequestsService],
    }).compile();

    controller = module.get<OvertimeRequestsController>(
      OvertimeRequestsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
