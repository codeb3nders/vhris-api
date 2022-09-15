import { PartialType } from '@nestjs/swagger';
import { CreateLearningDevelopmentDto } from './create-learning_development.dto';

export class UpdateLearningDevelopmentDto extends PartialType(CreateLearningDevelopmentDto) {}
