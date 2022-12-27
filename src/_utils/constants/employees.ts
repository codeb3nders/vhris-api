import { CronExpression } from '@nestjs/schedule';
export const CONSTANTS = {
  HR_ADMIN: 'HR ADMIN',
  TTL: 300,
  XTTL: process.env.TTL,
  LEAVE_BALANCE: 1.25,
  EMPLOYMENT_TYPE_REGULAR: 'REGULAR',
  CRON_TIME: CronExpression.EVERY_10_SECONDS,
};
