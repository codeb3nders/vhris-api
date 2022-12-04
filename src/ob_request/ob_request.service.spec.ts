import { Test, TestingModule } from '@nestjs/testing';
import { OBRequestService } from './ob_request.service';

describe('OBRequestService', () => {
  let service: OBRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OBRequestService],
    }).compile();

    service = module.get<OBRequestService>(OBRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
