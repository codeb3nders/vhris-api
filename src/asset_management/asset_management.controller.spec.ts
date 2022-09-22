import { Test, TestingModule } from '@nestjs/testing';
import { AssetManagementController } from './asset_management.controller';
import { AssetManagementService } from './asset_management.service';

describe('AssetManagementController', () => {
  let controller: AssetManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetManagementController],
      providers: [AssetManagementService],
    }).compile();

    controller = module.get<AssetManagementController>(AssetManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
