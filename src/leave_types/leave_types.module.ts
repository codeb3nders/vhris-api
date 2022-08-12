import { Module } from '@nestjs/common';
import { LeaveTypeService } from './leave_types.service';
import { LeaveTypesController } from './leave_types.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LeaveTypesSchema, Leave_types } from './entities/leave_types.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Leave_types.name,
        schema: LeaveTypesSchema,
      },
    ]),
  ],

  controllers: [LeaveTypesController],
  providers: [LeaveTypeService],
})
export class LeaveTypesModule {}
