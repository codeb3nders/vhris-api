import { Module } from '@nestjs/common';
import { UserLogsService } from './user_logs.service';
import { UserLogsController } from './user_logs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserLog, UserLogSchema } from './entities/user_log.entity';
import { UserLogRepository } from 'src/_repositories/user_logs/user_log.repository';
import { AggregateUserLog } from 'src/_aggregates/user_log.aggregate';
import { UserLogResponseHandler } from 'src/_utils/response_handler/user_log_handler.response';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserLog.name,
        schema: UserLogSchema,
      },
    ]),
  ],
  controllers: [UserLogsController],
  providers: [
    UserLogsService,
    UserLogRepository,
    AggregateUserLog,
    UserLogResponseHandler,
  ],
})
export class UserLogsModule {}
