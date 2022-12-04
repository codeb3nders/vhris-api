import { Test, TestingModule } from '@nestjs/testing';
import { OBRequestController } from './ob_request.controller';
import { OBRequestService } from './ob_request.service';

describe('OBRequestController', () => {
  let controller: OBRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OBRequestController],
      providers: [OBRequestService],
    }).compile();

    controller = module.get<OBRequestController>(OBRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
