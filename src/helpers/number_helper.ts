import { ConfigService } from '@nestjs/config';

export const zeroPad = (num: number, places?: number) => {
  const configService = new ConfigService();
  const zeroPad = configService.get('zeroPad');
  const defaultZeroPaddings = places ? places : zeroPad;
  return String(num).padStart(defaultZeroPaddings, '0');
};
