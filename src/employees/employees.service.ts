import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee, EmployeeDocument } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { UserCredentialsService } from 'src/user_credentials/user_credentials.service';
import { CreateUserCredentialDto } from 'src/user_credentials/dto/create-user_credential.dto';
import { zeroPad } from 'src/utils/numbers/number_helper.util';
import { AutoCredentialEnum } from 'src/enums/employee.enum';
import { EmployeeFields } from './dto/fields-employe';
import { defaultItems, defaultSet } from './interface/employee.interface';
import { aggregateLookUp } from 'src/utils/data/aggregate.util';

@Injectable()
export class EmployeesService {
  private aggregateQry;
  constructor(
    @InjectModel(Employee.name)
    private employeeModel: Model<EmployeeDocument>,
    @Inject(forwardRef(() => UserCredentialsService))
    private userCredentialsService: UserCredentialsService,
  ) {
    this.aggregateQry = [
      {
        $project: {
          ...defaultItems,
          name: {
            $concat: [
              '$lastName',
              ',',
              ' ',
              '$firstName',
              ' ',
              '$middleName',
              ' ',
            ],
          },
        },
      },
      {
        $lookup: {
          from: 'enum_tables',
          let: { field: '$location' },
          pipeline: [
            { $addFields: { code: { $toUpper: '$code' } } },
            { $match: { $expr: { $in: ['$code', '$$field'] } } },
          ],
          as: 'locationEnum',
        },
      },
      {
        $lookup: aggregateLookUp(
          'enum_tables',
          'userGroup',
          'code',
          'userGroupEnum',
        ),
      },

      {
        $lookup: aggregateLookUp('enum_tables', 'gender', 'code', 'genderEnum'),
      },

      {
        $lookup: aggregateLookUp(
          'enum_tables',
          'civilStatus',
          'code',
          'civilStatusEnum',
        ),
      },

      {
        $lookup: aggregateLookUp(
          'enum_tables',
          'citizenship',
          'code',
          'citizenshipEnum',
        ),
      },

      {
        $lookup: aggregateLookUp(
          'enum_tables',
          'religion',
          'code',
          'religionEnum',
        ),
      },

      {
        $lookup: aggregateLookUp(
          'enum_tables',
          'payRateType',
          'code',
          'payRateTypeEnum',
        ),
      },

      {
        $lookup: aggregateLookUp(
          'enum_tables',
          'payrollGroup',
          'code',
          'payrollGroupEnum',
        ),
      },

      {
        $lookup: aggregateLookUp(
          'enum_tables',
          'deductPhilhealth',
          'code',
          'deductPhilhealthEnum',
        ),
      },

      {
        $lookup: aggregateLookUp(
          'enum_tables',
          'fixedContributionRate',
          'code',
          'fixedContributionRateEnum',
        ),
      },

      {
        $lookup: aggregateLookUp(
          'enum_tables',
          'paymentMethod',
          'code',
          'paymentMethodEnum',
        ),
      },

      {
        $lookup: aggregateLookUp(
          'enum_tables',
          'position',
          'code',
          'positionEnum',
        ),
      },

      {
        $lookup: aggregateLookUp('enum_tables', 'rank', 'code', 'rankEnum'),
      },

      {
        $lookup: aggregateLookUp(
          'enum_tables',
          'department',
          'code',
          'departmentEnum',
        ),
      },
      {
        $lookup: aggregateLookUp(
          'enum_tables',
          'employmentStatus',
          'code',
          'employmentStatusEnum',
        ),
      },
      {
        $lookup: aggregateLookUp(
          'enum_tables',
          'employmentType',
          'code',
          'employmentTypeEnum',
        ),
      },

      {
        $lookup: {
          from: 'employees',
          localField: 'reportsTo',
          foreignField: 'employeeNo',
          as: 'reportingTo',
        },
      },
      {
        $set: {
          ...defaultSet,

          birthDate: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: { $toDate: '$birthDate' },
            },
          },
          yearsInService: {
            $subtract: [
              {
                $year: {
                  $ifNull: [{ $toDate: '$dateInactive' }, '$$NOW'],
                },
              },
              {
                $year: { $toDate: '$dateHired' },
              },
            ],
          },
          age: {
            $subtract: [
              {
                $subtract: [
                  {
                    $year: '$$NOW',
                  },
                  {
                    $year: { $toDate: '$birthDate' },
                  },
                ],
              },
              {
                $cond: [
                  {
                    $lt: [
                      {
                        $dayOfYear: '$birthday',
                      },
                      {
                        $dayOfYear: '$$NOW',
                      },
                    ],
                  },
                  0,
                  1,
                ],
              },
            ],
          },
        },
      },
    ];
  }

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const createdEmployee = new this.employeeModel(createEmployeeDto);

    const lastEmployee = await this.findLast();
    const newEmployeeNo = Number(lastEmployee?.employeeNo || 0) + 1;
    createdEmployee.employeeNo = zeroPad(newEmployeeNo);
    const response = await createdEmployee.save();

    if (
      response &&
      AutoCredentialEnum[response.userGroup.toUpperCase()] !== undefined
    ) {
      const userCredentials: CreateUserCredentialDto = {
        employeeNo: response.employeeNo,
        timestamp: new Date().getTime(),

        accessGroup: response.userGroup,
        isActive: true,
        email: response.personalEmail,
      };

      const result: any = await this.userCredentialsService.create(
        userCredentials,
      );

      response.password = result.password; //TODO: to be remove

      return response;
    }
    return response;
  }

  async findAll(_params?: any): Promise<Employee[]> {
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
    return this.employeeModel.aggregate(pLine);
  }

  async findLast() {
    return this.employeeModel.findOne({}, {}, { sort: { employeeNo: -1 } });
  }

  async findOne(employeeNo: string, _params?: any) {
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
      {
        $limit: 1,
      },
      ..._relations,
    ];

    const response = await this.employeeModel.aggregate(pipeline);
    return response[0];
  }

  async update(employeeNo: string, updateEmployeeDto: UpdateEmployeeDto) {
    updateEmployeeDto['lastModifiedDate'] = Date.now();
    return this.employeeModel.updateOne(
      { employeeNo },
      { $set: { ...updateEmployeeDto } },
    );
  }

  async remove(employeeNo: string) {
    const response = await this.employeeModel.deleteOne({ employeeNo });
    if (response) {
      await this.userCredentialsService.remove(employeeNo);
    }
    return response;
  }

  async search(_params?: any): Promise<Employee[]> {
    const pipeline = [...this.aggregateQry];

    const relations = _params.relations;

    delete _params.relations;
    const params = _params;

    const keys = Object.keys(params);
    let n = keys.length;
    const toMatch = [];
    while (n--) {
      let value = isNaN(params[keys[n]])
        ? params[keys[n]].toUpperCase()
        : Number(params[keys[n]]);

      if (value === 'true' || value === 'false') {
        value = value === 'true';
      }
      if (typeof value === 'boolean') {
        toMatch.push({
          ['$expr']: { $eq: [`$${keys[n]}`, value] },
        });
      } else {
        if (keys[n] === 'isActive') {
          toMatch.push({
            [`${keys[n]}`]: value === 'TRUE',
          });
        } else {
          if (isNaN(Number(value))) {
            toMatch.push({
              [`${keys[n]}`]: { ['$regex']: value },
            });
          } else {
            toMatch.push({
              [`${keys[n]}`]: value,
            });
          }
        }
      }
    }

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

    const pLine = [...pipeline, ..._relations];
    if (toMatch.length > 0) {
      pLine.push({
        $match: {
          $or: [...toMatch],
        },
      });
    }
    return this.employeeModel.aggregate(pLine);
  }
}
