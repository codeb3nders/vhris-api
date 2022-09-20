import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { withEnumValuesList } from 'src/enums/employee.enum';
import { CreateEmployeeHistoryDto } from './dto/create-employee_history.dto';
import { UpdateEmployeeHistoryDto } from './dto/update-employee_history.dto';
import {
  Employee_history,
  EmployeeHistoryDocument,
} from './entities/employee_history.entity';

/**
 * **
location
userGroup
gender
civilStatus
citizenship
religion
payRateType
payrollGroup
deductPhilhealth
fixedContributionRate
paymentMethod
position
rank
department
employmentStatus
employmentType
reportsTo
 */

@Injectable()
export class EmployeeHistoryService {
  private aggregateQry;
  constructor(
    @InjectModel(Employee_history.name)
    private employeeHistoryModel: Model<EmployeeHistoryDocument>,
  ) {
    this.aggregateQry = [...enumsLookUp()];
  }
  async create(createEmployeeHistoryDto: CreateEmployeeHistoryDto) {
    const createEmployeeHistory = new this.employeeHistoryModel(
      createEmployeeHistoryDto,
    );
    return await createEmployeeHistory.save();
  }

  // async findAll() {
  //   return await this.employeeHistoryModel.find();
  // }

  async findAll(_params?: any): Promise<Employee_history[]> {
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
    return this.employeeHistoryModel.aggregate(pLine);
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

    return await this.employeeHistoryModel.aggregate(pipeline);
  }

  update(
    employeeNo: string,
    updateEmployeeHistoryDto: UpdateEmployeeHistoryDto,
  ) {
    return this.employeeHistoryModel.updateOne(
      { employeeNo },
      { $set: { ...updateEmployeeHistoryDto } },
    );
  }

  remove(employeeNo: string) {
    return this.employeeHistoryModel.deleteOne({ employeeNo });
  }
}

const lookUp = (
  tableName: string,
  localField: string,
  foreignField: string,
  asName: string,
) => {
  return {
    from: `${tableName}`,
    let: { field: { $toUpper: `$${localField}` } },
    pipeline: [
      { $addFields: { code: { $toUpper: `$${foreignField}` } } },
      { $match: { $expr: { $eq: [`$${foreignField}`, '$$field'] } } },
    ],
    as: asName,
  };
};

const enumsLookUp = () => {
  return withEnumValuesList.map((item) => {
    return {
      $lookup: lookUp('enum_tables', `details.${item}`, 'code', `${item}Enum`),
    };
  });
};
