import { Document, Model } from 'mongoose';
import {
  aggregateLookUp,
  aggregateFormatDate,
} from 'src/utils/data/aggregate.util';

export abstract class EntityRepository<T extends Document> {
  constructor(private entityModel: Model<T>, private aggregateQry: any) {}
  async create(createEntityData: unknown) {
    const createdEmployee = new this.entityModel(createEntityData);
    return await createdEmployee.save();
  }

  async find(entityFilterQuery?: any): Promise<T[]> {
    const pipeline = [...this.aggregateQry.values()];

    const relations = entityFilterQuery.relations;

    delete entityFilterQuery.relations;
    const params = entityFilterQuery;

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
    return this.entityModel.aggregate(pLine);
  }

  async findByEmployeeId(
    employeeNo: string,
    entityFilterQuery?: any,
  ): Promise<T[]> {
    const _relations = [];

    if (entityFilterQuery) {
      const relations = entityFilterQuery.relations;
      delete entityFilterQuery.relations;

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
      ...this.aggregateQry.values(),
      {
        $match: {
          employeeNo: employeeNo,
        },
      },

      ..._relations,
    ];

    return await this.entityModel.aggregate(pipeline);
  }

  async update(
    id: string,
    updateAssetManagementDto: unknown,
  ): Promise<unknown> {
    updateAssetManagementDto['lastModifiedDate'] = Date.now();
    const filter = { _id: id };
    const update = updateAssetManagementDto;
    try {
      return await this.entityModel.updateOne(filter, update);
    } catch (error) {
      return `Failed updating record with id ${id}`;
    }
  }

  remove(id: string) {
    return this.entityModel.deleteOne({ id });
  }
}
