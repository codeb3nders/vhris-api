import { Test, TestingModule } from '@nestjs/testing';
import { TeamLeadersController } from './team_leaders.controller';
import { TeamLeadersService } from './team_leaders.service';

describe('TeamLeadersController', () => {
  let controller: TeamLeadersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamLeadersController],
      providers: [TeamLeadersService],
    }).compile();

    controller = module.get<TeamLeadersController>(TeamLeadersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
