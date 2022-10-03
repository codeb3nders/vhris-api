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
import { learningDevelopmentResponseHandler } from './response_handler/learning_development.response';

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
  async findAll() {
    const response = await this.learningDevelopmentService.findAll();
    if (!response || response.length < 1) {
      return response;
    }
    return learningDevelopmentResponseHandler.ok(response);
  }

  @Get(':employeeNo')
  async find(@Param('employeeNo') employeeNo: string) {
    const response = await this.learningDevelopmentService.find(employeeNo);
    if (!response || response.length < 1) {
      return response;
    }
    return learningDevelopmentResponseHandler.ok(response);
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
