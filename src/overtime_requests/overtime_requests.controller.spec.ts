import { Test, TestingModule } from '@nestjs/testing';
import { OvertimeRequestController } from './overtime_requests.controller';
import { OvertimeRequestService } from './overtime_requests.service';

describe('OvertimeRequestController', () => {
  let controller: OvertimeRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OvertimeRequestController],
      providers: [OvertimeRequestService],
    }).compile();

    controller = module.get<OvertimeRequestController>(
      OvertimeRequestController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
