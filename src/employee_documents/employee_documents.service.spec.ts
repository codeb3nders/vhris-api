import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeDocumentService } from './employee_documents.service';

describe('EmployeeDocumentService', () => {
  let service: EmployeeDocumentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeDocumentService],
    }).compile();

    service = module.get<EmployeeDocumentService>(EmployeeDocumentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
