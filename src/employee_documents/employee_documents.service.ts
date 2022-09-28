import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
        $lookup: lookUp(
          'enum_tables',
          'documentType',
          'code',
          'documentTypeEnum',
        ),
      },

      {
        $set: {
          dateAssigned: formatDate('dateAssigned'),
          dateReturned: formatDate('dateReturned'),
          lastModifiedDate: formatDate('lastModifiedDate'),
        },
      },
    ];
  }
  async create(createEmployeeDocumentDto: CreateEmployeeDocumentDto) {
    const createdEmployee = new this.employeeDocumentModel(
      createEmployeeDocumentDto,
    );

    return await createdEmployee.save();
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
      { $addFields: { [`${foreignField}`]: { $toUpper: `$${foreignField}` } } },
      { $match: { $expr: { $eq: [`$${foreignField}`, `$$field`] } } },
    ],
    as: asName,
  };
};

const formatDate = (date: string) => {
  return {
    $dateToString: {
      format: '%Y-%m-%d',
      date: { $toDate: `$${date}` },
    },
  };
};
