import { Test, TestingModule } from '@nestjs/testing';
import { TeamLeadersService } from './team_leaders.service';

describe('TeamLeadersService', () => {
  let service: TeamLeadersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeamLeadersService],
    }).compile();

    service = module.get<TeamLeadersService>(TeamLeadersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
