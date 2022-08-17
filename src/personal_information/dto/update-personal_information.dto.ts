import { PartialType } from '@nestjs/swagger';
import { CreatePersonalInformationDto } from './create-personal_information.dto';

export class UpdatePersonalInformationDto extends PartialType(CreatePersonalInformationDto) {}
