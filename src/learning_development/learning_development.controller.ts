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
  find(@Param('employeeNo') employeeNo: string) {
    return this.learningDevelopmentService.find(employeeNo);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLearningDevelopmentDto: UpdateLearningDevelopmentDto,
  ) {
    return await this.learningDevelopmentService.update(
      id,
      updateLearningDevelopmentDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.learningDevelopmentService.remove(id);
  }
}
