import { Test, TestingModule } from '@nestjs/testing';
import { ValidatorsService } from 'src/_validators/validators.service';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';

describe('EmployeesController', () => {
  let controller: EmployeesController;

  const mockEmployeeService = {
    validators: jest.fn(() => {}),
  };
  const mockValidatorService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [EmployeesService, ValidatorsService],
    })
      .overrideProvider(EmployeesService)
      .useValue(mockEmployeeService)
      .compile();

    controller = module.get<EmployeesController>(EmployeesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
