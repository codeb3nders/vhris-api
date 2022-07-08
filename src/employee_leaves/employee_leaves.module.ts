import { Module } from '@nestjs/common';
import { EmployeeLeavesService } from './employee_leaves.service';
import { EmployeeLeavesController } from './employee_leaves.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeLeavesSchema, Employee_leaves } from './entities/employee_leave.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Employee_leaves.name,
        schema: EmployeeLeavesSchema,
      },
    ]),
  ],
  controllers: [EmployeeLeavesController],
  providers: [EmployeeLeavesService]
})
export class EmployeeLeavesModule {}
