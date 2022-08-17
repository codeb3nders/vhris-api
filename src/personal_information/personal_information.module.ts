import { Module } from '@nestjs/common';
import { PersonalInformationService } from './personal_information.service';
import { PersonalInformationController } from './personal_information.controller';

@Module({
  controllers: [PersonalInformationController],
  providers: [PersonalInformationService]
})
export class PersonalInformationModule {}
