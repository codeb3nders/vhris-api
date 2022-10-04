import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { aggregateFormatDate } from 'src/utils/aggregate_helper';
import { CreateDisciplinaryActionDto } from './dto/create-disciplinary_action.dto';
import { UpdateDisciplinaryActionDto } from './dto/update-disciplinary_action.dto';
import {
  DisciplinaryAction,
  DisciplinaryActionDocument,
} from './entities/disciplinary_action.entity';

@Injectable()
export class DisciplinaryActionsService {
  private aggregateQry;
  constructor(
    @InjectModel(DisciplinaryAction.name)
    private assetManagementModel: Model<DisciplinaryActionDocument>,
  ) {
    this.aggregateQry = [
      {
        $set: {
          dateAssigned: aggregateFormatDate('dateAssigned'),
          dateReturned: aggregateFormatDate('dateReturned'),
          lastModifiedDate: aggregateFormatDate('lastModifiedDate'),
        },
      },
    ];
  }

  async create(createDisciplinaryActionDto: CreateDisciplinaryActionDto) {
    const createdDisciplinaryAction = new this.assetManagementModel(
      createDisciplinaryActionDto,
    );

    return await createdDisciplinaryAction.save();
  }

  findAll() {
    return `This action returns all disciplinaryActions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} disciplinaryAction`;
  }

  update(id: number, updateDisciplinaryActionDto: UpdateDisciplinaryActionDto) {
    return `This action updates a #${id} disciplinaryAction`;
  }

  remove(id: number) {
    return `This action removes a #${id} disciplinaryAction`;
  }
}
