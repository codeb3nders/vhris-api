import { Test, TestingModule } from '@nestjs/testing';
import { OvertimeRequestsService } from './overtime_requests.service';

describe('OvertimeRequestsService', () => {
  let service: OvertimeRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OvertimeRequestsService],
    }).compile();

    service = module.get<OvertimeRequestsService>(OvertimeRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
