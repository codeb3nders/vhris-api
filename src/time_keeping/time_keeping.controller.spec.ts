import { Test, TestingModule } from '@nestjs/testing';
import { TimeKeepingController } from './time_keeping.controller';
import { TimeKeepingService } from './time_keeping.service';

describe('TimeKeepingController', () => {
  let controller: TimeKeepingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeKeepingController],
      providers: [TimeKeepingService],
    }).compile();

    controller = module.get<TimeKeepingController>(TimeKeepingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
