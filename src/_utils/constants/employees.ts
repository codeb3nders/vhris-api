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
  CRON_TIME: '*/15 * * * * *', // Every day 01 1:30 am
  RESET_CRON_TIME: '0 */1 * * * *', // Every Jan 01 1:00 am
};

/**
 * 

CRON_TIME: '* 30 1 * * *', // Every day 01 1:30 am
RESET_CRON_TIME: '* 00 01 01 01 *', // Every Jan 01 1:00 am


 */
