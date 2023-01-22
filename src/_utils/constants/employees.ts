import { CronExpression } from '@nestjs/schedule';
export const CONSTANTS = {
  HR_ADMIN: 'HR ADMIN',
  TTL: 300,
  XTTL: process.env.TTL,
  SL: 1.25,
  SIL: 3,
  VL: 1.25,
  BL: 1,
  BRL: 1,
  NL: 1,
  ML: 105,
  PL: 5,
  EMPLOYMENT_TYPE_REGULAR: 'REGULAR',
  CRON_TIME: CronExpression.EVERY_10_MINUTES,
};
