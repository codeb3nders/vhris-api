import { Test, TestingModule } from '@nestjs/testing';
import { LeaveTypesController } from './leave_types.controller';
import { LeaveTypeService } from './leave_types.service';

describe('LeaveTypesController', () => {
  let controller: LeaveTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeaveTypesController],
      providers: [LeaveTypeService],
    }).compile();

    controller = module.get<LeaveTypesController>(LeaveTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
