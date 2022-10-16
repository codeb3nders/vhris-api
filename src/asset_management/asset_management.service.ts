import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  aggregateFormatDate,
  aggregateLookUp,
} from 'src/utils/data/aggregate.util';

import { CreateAssetManagementDto } from './dto/create-asset_management.dto';
import { UpdateAssetManagementDto } from './dto/update-asset_management.dto';
import {
  AssetManagement,
  AssetManagementDocument,
} from './entities/asset_management.entity';

@Injectable()
export class AssetManagementService {
  private aggregateQry;
  constructor(
    @InjectModel(AssetManagement.name)
    private assetManagementModel: Model<AssetManagementDocument>,
  ) {
    this.aggregateQry = [
      {
        $lookup: aggregateLookUp(
          'enum_tables',
          'assetType',
          'code',
          'assetTypeEnum',
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
  async create(createAssetManagementDto: CreateAssetManagementDto) {
    const createdEmployee = new this.assetManagementModel(
      createAssetManagementDto,
    );

    return await createdEmployee.save();
  }

  async findAll(_params?: any): Promise<AssetManagement[]> {
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
    return this.assetManagementModel.aggregate(pLine);
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

    return await this.assetManagementModel.aggregate(pipeline);
  }

  async update(id: string, updateAssetManagementDto: UpdateAssetManagementDto) {
    updateAssetManagementDto['lastModifiedDate'] = Date.now();
    const filter = { _id: id };
    const update = updateAssetManagementDto;
    try {
      return await this.assetManagementModel.updateOne(filter, update);
    } catch (error) {
      return `Failed updating record with id ${id}`;
    }
  }

  remove(id: string) {
    return this.assetManagementModel.deleteOne({ id });
  }
}
