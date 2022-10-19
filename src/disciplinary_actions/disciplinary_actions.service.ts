import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { zeroPad } from 'src/_utils/numbers/number_helper.util';
import {
  aggregateFormatDate,
  aggregateLookUp,
} from 'src/_aggregates/helper.aggregate';
import { CreateDisciplinaryActionDto } from './dto/create-disciplinary_action.dto';
import { UpdateDisciplinaryActionDto } from './dto/update-disciplinary_action.dto';
import {
  DisciplinaryAction,
  DisciplinaryActionDocument,
} from './entities/disciplinary_action.entity';
import { DisciplinaryActionRepository } from 'src/_repositories/disciplinary_actions/disciplinary_actions.repository';

@Injectable()
export class DisciplinaryActionsService {
  private aggregateQry;
  constructor(
    @InjectModel(DisciplinaryAction.name)
    private disciplinaryActionModel: Model<DisciplinaryActionDocument>,
    private disciplinaryActionRepository: DisciplinaryActionRepository,
  ) {
    this.aggregateQry = [
      {
        $lookup: aggregateLookUp(
          'enums_table',
          'violationCategory',
          'code',
          'violationCategoryEnum',
        ),
      },
      {
        $lookup: aggregateLookUp(
          'enums_table',
          'violations',
          'code',
          'violationsEnum',
        ),
      },

      {
        $lookup: aggregateLookUp(
          'enums_table',
          'offenseStage',
          'code',
          'offenseStageEnum',
        ),
      },
      {
        $lookup: aggregateLookUp(
          'enums_table',
          'offenseLevel',
          'code',
          'offenseLevelEnum',
        ),
      },
      {
        $set: {
          dateAcknowledged: aggregateFormatDate('dateAcknowledged'),
          misconductReportIssueDate: aggregateFormatDate(
            'misconductReportIssueDate',
          ),
          noticeToExplainIssueDate: aggregateFormatDate(
            'noticeToExplainIssueDate',
          ),

          explanationDate: aggregateFormatDate('explanationDate'),
          lastModifiedDate: aggregateFormatDate('lastModifiedDate'),

          aging: {
            $dateDiff: {
              startDate: '$misconductReportIssueDate',
              endDate: '$$NOW',
              unit: 'day',
            },
          },
        },
      },
    ];
  }

  async create(createDisciplinaryActionDto: CreateDisciplinaryActionDto) {
    const year = new Date().getFullYear();
    const lastRecord = await this.disciplinaryActionRepository.findLast();
    const lastCaseNumber =
      (lastRecord && lastRecord.caseNumber.split('-').pop()) || 0;
    const caseNumber = Number(lastCaseNumber) + 1;

    createDisciplinaryActionDto.caseNumber = `${year}-${zeroPad(
      caseNumber,
      7,
    )}`;

    return await this.disciplinaryActionRepository.create(
      createDisciplinaryActionDto,
    );
  }

  async findAll(entityFilterQuery?: any): Promise<DisciplinaryAction[]> {
    return await this.disciplinaryActionRepository.aggregateFind(
      entityFilterQuery,
    );
  }

  async find(employeeNo: string, _params?: any) {
    return await this.disciplinaryActionRepository.aggregateFindOne(
      employeeNo,
      _params,
    );
  }

  async update(
    id: string,
    updateDisciplinaryActionDto: UpdateDisciplinaryActionDto,
  ) {
    updateDisciplinaryActionDto['lastModifiedDate'] = Date.now();
    const filter = { _id: id };
    const update = updateDisciplinaryActionDto;

    return await this.disciplinaryActionRepository.findOneAndUpdate(
      filter,
      update,
    );
  }

  remove(id: string) {
    return this.disciplinaryActionRepository.deleteOne(id);
  }
}
