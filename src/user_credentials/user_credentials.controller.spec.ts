import { Test, TestingModule } from '@nestjs/testing';
import { UserCredentialsController } from './user_credentials.controller';
import { UserCredentialsService } from './user_credentials.service';

describe('UserCredentialsController', () => {
  let controller: UserCredentialsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCredentialsController],
      providers: [UserCredentialsService],
    }).compile();

    controller = module.get<UserCredentialsController>(
      UserCredentialsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
