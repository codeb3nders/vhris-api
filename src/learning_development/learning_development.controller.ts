import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LearningDevelopmentService } from './learning_development.service';
import { CreateLearningDevelopmentDto } from './dto/create-learning_development.dto';
import { UpdateLearningDevelopmentDto } from './dto/update-learning_development.dto';

@Controller('learning-development')
export class LearningDevelopmentController {
  constructor(
    private readonly learningDevelopmentService: LearningDevelopmentService,
  ) {}

  @Post()
  create(@Body() createLearningDevelopmentDto: CreateLearningDevelopmentDto) {
    return this.learningDevelopmentService.create(createLearningDevelopmentDto);
  }

  @Get()
  findAll() {
    return this.learningDevelopmentService.findAll();
  }

  @Get(':employeeNo')
  findOne(@Param('employeeNo') employeeNo: string) {
    return this.learningDevelopmentService.findOne(employeeNo);
  }
}