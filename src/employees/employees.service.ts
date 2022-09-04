import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee, EmployeeDocument } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { UserCredentialsService } from 'src/user_credentials/user_credentials.service';
import { CreateUserCredentialDto } from 'src/user_credentials/dto/create-user_credential.dto';
import { zeroPad } from 'src/helpers/number_helper';
import { AutoCredentialEnum } from 'src/enums/employee.enum';

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
        $lookup: {
          from: 'enum_tables',
          localField: 'location',
          foreignField: 'code',
          as: 'locationEnum',
        },
      },
      {
        $lookup: {
          from: 'enum_tables',
          localField: 'department',
          foreignField: 'code',
          as: 'departmentEnum',
        },
      },
      {
        $lookup: {
          from: 'enum_tables',
          localField: 'employmentStatus',
          foreignField: 'code',
          as: 'employmentStatusEnum',
        },
      },
      {
        $lookup: {
          from: 'enum_tables',
          localField: 'employmentType',
          foreignField: 'code',
          as: 'employmentTypeEnum',
        },
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
          yearsInService: {
            $subtract: [
              {
                $year: {
                  $ifNull: ['$contractEndDate', '$$NOW'],
                },
              },
              {
                $year: '$dateHired',
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
                    $year: '$birthDate',
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
      AutoCredentialEnum[response.userGroup.toLowerCase()] !== undefined
    ) {
      const userCredentials: CreateUserCredentialDto = {
        employeeNo: response.employeeNo,
        timeStamp: new Date().getTime(),

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
    const pipeline = this.aggregateQry;

    const relations = _params.relations;
    delete _params.relations;
    const params = _params;

    let key;
    const keys = Object.keys(params);
    let n = keys.length;
    const newOject: any = {};
    while (n--) {
      key = keys[n];
      newOject[key] = isNaN(params[key]) ? params[key] : Number(params[key]);
    }

    if (newOject.isActive) {
      newOject.isActive = newOject.isActive === 'true';
    }

    const prams = {
      $match: newOject,
    };

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

    const pLine = [...pipeline, prams, ..._relations];
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
}
