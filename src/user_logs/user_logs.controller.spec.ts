import { Test, TestingModule } from '@nestjs/testing';
import { UserLogsController } from './user_logs.controller';
import { UserLogsService } from './user_logs.service';

describe('UserLogsController', () => {
  let controller: UserLogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserLogsController],
      providers: [UserLogsService],
    }).compile();

    controller = module.get<UserLogsController>(UserLogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
