import { Test, TestingModule } from '@nestjs/testing';
import { EnumTablesController } from './enum_tables.controller';
import { EnumTablesService } from './enum_tables.service';

describe('EnumTablesController', () => {
  let controller: EnumTablesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnumTablesController],
      providers: [EnumTablesService],
    }).compile();

    controller = module.get<EnumTablesController>(EnumTablesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
