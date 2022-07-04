import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from 'config/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { LeaveRequestModule } from './leave_requests/leave_request.module';
import { OvertimeRequestsModule } from './overtime_requests/overtime_requests.module';

@Module({
  
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'env_var/.env',
      load: [configuration],
    }),
    EmployeesModule, 
    MongooseModule.forRoot(`mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`), 
    LeaveRequestModule, OvertimeRequestsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
