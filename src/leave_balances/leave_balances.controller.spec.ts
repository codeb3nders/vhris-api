import { Test, TestingModule } from '@nestjs/testing';
import { LeaveBalanceController } from './leave_balances.controller';
import { LeaveBalanceService } from './leave_balances.service';

describe('LeaveBalanceController', () => {
  let controller: LeaveBalanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeaveBalanceController],
      providers: [LeaveBalanceService],
    }).compile();

    controller = module.get<LeaveBalanceController>(LeaveBalanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
