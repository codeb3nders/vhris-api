import { PartialType } from '@nestjs/swagger';
import { CreateOBRequestDto } from './create-ob_request.dto';

export class UpdateOBRequestDto extends PartialType(CreateOBRequestDto) {}
