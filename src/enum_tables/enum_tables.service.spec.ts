import { Test, TestingModule } from '@nestjs/testing';
import { EnumTablesService } from './enum_tables.service';

describe('EnumTablesService', () => {
  let service: EnumTablesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnumTablesService],
    }).compile();

    service = module.get<EnumTablesService>(EnumTablesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
