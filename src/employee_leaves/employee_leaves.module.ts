import { Module } from '@nestjs/common';
import { EmployeeLeavesService } from './employee_leaves.service';
import { EmployeeLeavesController } from './employee_leaves.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EmployeeLeavesSchema,
  EmployeeLeaves,
} from './entities/employee_leave.entity';
import { EmployeeLeavesRepository } from 'src/_repositories/employee_leaves/employee_leaves.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EmployeeLeaves.name,
        schema: EmployeeLeavesSchema,
      },
    ]),
  ],
  controllers: [EmployeeLeavesController],
  providers: [EmployeeLeavesService, EmployeeLeavesRepository],
})
export class EmployeeLeavesModule {}
