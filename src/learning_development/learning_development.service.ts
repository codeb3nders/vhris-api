import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLearningDevelopmentDto } from './dto/create-learning_development.dto';
import { UpdateLearningDevelopmentDto } from './dto/update-learning_development.dto';
import { LearningDevelopment } from './entities/learning_development.entity';

@Injectable()
export class LearningDevelopmentService {
  constructor(
    @InjectModel(LearningDevelopment.name)
    private learningDevelopment: Model<LearningDevelopment>,
  ) {}

  async create(createLearningDevelopmentDto: CreateLearningDevelopmentDto) {
    const createLearningDevelopment = new this.learningDevelopment(
      createLearningDevelopmentDto,
    );
    return await createLearningDevelopment.save();
  }

  async findAll() {
    return await this.learningDevelopment.find();
  }

  async find(employeeNo: string) {
    return this.learningDevelopment.find({ employeeNo });
  }

  async update(
    id: string,
    updateLearningDevelopmentDto: UpdateLearningDevelopmentDto,
  ) {
    updateLearningDevelopmentDto['lastModifiedDate'] = Date.now();
    const filter = { _id: id };
    const update = updateLearningDevelopmentDto;
    try {
      return await this.learningDevelopment.updateOne(filter, update);
    } catch (error) {
      return `Failed updating record with id ${id}`;
    }
  }

  remove(id: string) {
    return this.learningDevelopment.deleteOne({ id });
  }
}
