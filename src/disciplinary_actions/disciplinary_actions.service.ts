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
    private disciplinaryActionModel: Model<DisciplinaryActionDocument>,
  ) {
    this.aggregateQry = [
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
        },
      },
    ];
  }

  async create(createDisciplinaryActionDto: CreateDisciplinaryActionDto) {
    const createdDisciplinaryAction = new this.disciplinaryActionModel(
      createDisciplinaryActionDto,
    );

    return await createdDisciplinaryAction.save();
  }

  async findAll(_params?: any): Promise<DisciplinaryAction[]> {
    const pipeline = [...this.aggregateQry];

    const relations = _params.relations;

    delete _params.relations;
    const params = _params;

    const keys = Object.keys(params);
    let n = keys.length;
    const toMatch = [];
    while (n--) {
      let value = isNaN(params[keys[n]])
        ? params[keys[n]].toLowerCase()
        : Number(params[keys[n]]);

      if (value === 'true' || value === 'false') {
        value = value === 'true';
      }
      if (typeof value === 'boolean') {
        toMatch.push({
          ['$expr']: { $eq: [`$${keys[n]}`, value] },
        });
      } else {
        toMatch.push({
          ['$expr']: { $eq: [{ $toLower: `$${keys[n]}` }, value] },
        });
      }
    }

    const match = toMatch.map((i) => {
      return { $match: i };
    });

    const _relations = [];

    if (relations) {
      const rel = JSON.parse(relations);

      rel.forEach((r) => {
        _relations.push({
          $lookup: {
            from: `${r}`,
            localField: 'employeeNo',
            foreignField: 'employeeNo',
            as: `${r}`,
          },
        });
      });
    }

    const pLine = [...pipeline, ...match, ..._relations];
    return this.disciplinaryActionModel.aggregate(pLine);
  }

  async find(employeeNo: string, _params?: any) {
    const _relations = [];

    if (_params) {
      const relations = _params.relations;
      delete _params.relations;

      if (relations) {
        const rel = JSON.parse(relations);

        rel.forEach((r) => {
          _relations.push({
            $lookup: {
              from: `${r}`,
              localField: 'employeeNo',
              foreignField: 'employeeNo',
              as: `${r}`,
            },
          });
        });
      }
    }

    const pipeline = [
      ...this.aggregateQry,
      {
        $match: {
          employeeNo: employeeNo,
        },
      },

      ..._relations,
    ];

    return await this.disciplinaryActionModel.aggregate(pipeline);
  }

  async update(
    id: string,
    updateDisciplinaryActionDto: UpdateDisciplinaryActionDto,
  ) {
    updateDisciplinaryActionDto['lastModifiedDate'] = Date.now();
    const filter = { _id: id };
    const update = updateDisciplinaryActionDto;
    try {
      return await this.disciplinaryActionModel.updateOne(filter, update);
    } catch (error) {
      return `Failed updating record with id ${id}`;
    }
  }

  remove(id: string) {
    return this.disciplinaryActionModel.deleteOne({ id });
  }
}