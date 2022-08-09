import { ConfigService } from '@nestjs/config';

export const zeroPad = (num: number, places: number) => {
  const configService = new ConfigService();
  const zeroPad = configService.get('xport');
  console.log('PPORT', zeroPad);
  const defaultZeroPad = places ? places : 4;
  return String(num).padStart(places, '0');
};
