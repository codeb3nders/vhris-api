import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  aggregateFormatDate,
  aggregateLookUp,
} from 'src/utils/data/aggregate.util';
import { CreateEmployeeDocumentDto } from './dto/create-employee_document.dto';
import { UpdateEmployeeDocumentDto } from './dto/update-employee_document.dto';
import {
  EmployeeDocument,
  EmployeeDocumentsDocument,
} from './entities/employee_document.entity';

@Injectable()
export class EmployeeDocumentsService {
  private aggregateQry;
  constructor(
    @InjectModel(EmployeeDocument.name)
    private employeeDocumentModel: Model<EmployeeDocumentsDocument>,
  ) {
    this.aggregateQry = [
      {
        $lookup: aggregateLookUp(
          'enums_table',
          'documentType',
          'code',
          'documentTypeEnum',
        ),
      },

      {
        $set: {
          dateAssigned: aggregateFormatDate('dateAssigned'),
          dateReturned: aggregateFormatDate('dateReturned'),
          lastModifiedDate: aggregateFormatDate('lastModifiedDate'),
        },
      },
    ];
  }
  async create(createEmployeeDocumentDto: CreateEmployeeDocumentDto) {
    const createdEmployee = new this.employeeDocumentModel(
      createEmployeeDocumentDto,
    );

    try {
      return await createdEmployee.save();
    } catch (error) {
      throw new HttpException(error.message || error, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(_params?: any): Promise<EmployeeDocument[]> {
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
    return this.employeeDocumentModel.aggregate(pLine);
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

    return await this.employeeDocumentModel.aggregate(pipeline);
  }

  async update(
    id: string,
    updateAssetManagementDto: UpdateEmployeeDocumentDto,
  ) {
    updateAssetManagementDto['lastModifiedDate'] = Date.now();
    const filter = { _id: id };
    const update = updateAssetManagementDto;
    try {
      return await this.employeeDocumentModel.updateOne(filter, update);
    } catch (error) {
      return `Failed updating record with id ${id}`;
    }
  }

  remove(id: string) {
    return this.employeeDocumentModel.deleteOne({ id });
  }
}
