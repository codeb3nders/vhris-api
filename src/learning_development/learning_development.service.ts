import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LearningDevelopmentRepository } from 'src/_repositories/learning_developments/learning_developments.repository';
import { CreateLearningDevelopmentDto } from './dto/create-learning_development.dto';
import { UpdateLearningDevelopmentDto } from './dto/update-learning_development.dto';
import { LearningDevelopment } from './entities/learning_development.entity';

@Injectable()
export class LearningDevelopmentService {
  constructor(
    @InjectModel(LearningDevelopment.name)
    private learningDevelopmentRepository: LearningDevelopmentRepository,
  ) {}

  async create(createLearningDevelopmentDto: CreateLearningDevelopmentDto) {
    return await this.learningDevelopmentRepository.create(
      createLearningDevelopmentDto,
    );
  }

  async findAll(): Promise<LearningDevelopment[]> {
    return await this.learningDevelopmentRepository.find();
  }

  async find(employeeNo: string): Promise<LearningDevelopment[]> {
    return await this.learningDevelopmentRepository.find({ employeeNo });
  }

  async update(
    id: string,
    updateLearningDevelopmentDto: UpdateLearningDevelopmentDto,
  ) {
    updateLearningDevelopmentDto['lastModifiedDate'] = Date.now();
    const filter = { _id: id };
    const update = updateLearningDevelopmentDto;

    return await this.learningDevelopmentRepository.findOneAndUpdate(
      filter,
      update,
    );
  }

  remove(id: string) {
    return this.learningDevelopmentRepository.deleteOne({ _id: id });
  }
}
