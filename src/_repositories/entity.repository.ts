import { forwardRef, Inject } from '@nestjs/common';
import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';
import { UserCredentialsService } from 'src/user_credentials/user_credentials.service';
import { CONSTANTS } from 'src/_utils/constants/employees';
import { isNil } from 'lodash';
interface StringMap {
  [key: string]: string;
}
export abstract class EntityRepository<T extends Document> {
  constructor(
    @Inject(forwardRef(() => UserCredentialsService))
    private entityModel: Model<T>,
    private aggregateQry?: any,
  ) {}

  async create(createEntityData: unknown) {
    const createdEmployee = new this.entityModel(createEntityData);
    return await createdEmployee.save();
  }

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T | null> {
    return await this.entityModel.findOne(entityFilterQuery, {
      _id: 0,
      __v: 0,
      ...projection,
    });
  }

  async find(
    entityFilterQuery?: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T[] | null> {
    return await this.entityModel.find(entityFilterQuery, {
      _id: 0,
      __v: 0,
      ...projection,
    });
  }

  getLeaveValue = (leave, newLeaveValue) => {
    return !isNil(leave) ? leave : newLeaveValue;
  };

  async findOneThenUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
  ): Promise<any> {
    const res: any = await this.entityModel.findOne(entityFilterQuery);
    try {
      if (!res) {
        await this.entityModel.findOneAndUpdate(
          entityFilterQuery,
          updateEntityData,
          {
            upsert: true,
          },
        );

        return updateEntityData;
      } else {
        const one = JSON.stringify(res.applicableMonth);

        const amConverted = JSON.parse(one);

        const index = amConverted.indexOf(
          updateEntityData.applicableMonth.toUpperCase(),
        );

        if (index !== -1) {
          return updateEntityData;
        } else {
          amConverted.push(updateEntityData.applicableMonth.toUpperCase());
        }

        const newData = {
          ...updateEntityData,
          applicableMonth: amConverted,
          VL: res.VL ? (res.VL += CONSTANTS.VL) : CONSTANTS.VL,
          SL: res.SL ? (res.SL += CONSTANTS.SL) : CONSTANTS.SL,
          BL: this.getLeaveValue(res.BL, updateEntityData.BL),
          PL: this.getLeaveValue(res.PL, updateEntityData.PL),
          ML: this.getLeaveValue(res.ML, updateEntityData.ML),
          CL: this.getLeaveValue(res.CL, updateEntityData.CL),
          UL: this.getLeaveValue(res.UL, updateEntityData.UL),
          BRL: this.getLeaveValue(res.BRL, updateEntityData.BRL),
          NL: this.getLeaveValue(res.NL, updateEntityData.NL),
          SIL: this.getLeaveValue(res.SIL, updateEntityData.SIL),
        };
        await this.entityModel.updateOne(entityFilterQuery, newData, {
          upsert: true,
        });

        return newData;
      }
    } catch (error) {
      return error.message || error;
    }
  }

  async upsert(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
  ): Promise<T | null> {
    return await this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      updateEntityData,
      {
        upsert: true,
      },
    );
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
  ): Promise<T | null> {
    return await this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      updateEntityData,
      {
        new: true,
      },
    );
  }

  async updateMany(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
  ) {
    return await this.entityModel.updateMany(
      entityFilterQuery,
      updateEntityData,
      {
        new: true,
      },
    );
  }

  async insertOrUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
  ): Promise<T | null> {
    return await this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      updateEntityData,
      {
        new: true,
        upsert: true,
      },
    );
  }

  async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.entityModel.deleteMany(entityFilterQuery);
    return deleteResult.deletedCount >= 1;
  }

  async deleteOne(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.entityModel.deleteOne(entityFilterQuery);
    return deleteResult.deletedCount >= 1;
  }

  // Aggregate Queries

  async aggregateFindOne(
    key: StringMap,
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
          ...key,
        },
      },
      {
        $limit: 1,
      },
      ..._relations,
    ];

    const pLine = [...pipeline, ..._relations];
    const response = await this.entityModel.aggregate(pLine);
    return response[0];
  }

  async aggregateFind(entityFilterQuery?: any): Promise<T[]> {
    const pipeline = [...this.aggregateQry.values()];

    const relations = entityFilterQuery.relations;

    delete entityFilterQuery.relations;
    const params = entityFilterQuery;

    const keys = Object.keys(params);

    let n = keys.length;
    const toMatch = [];
    while (n--) {
      let value =
        isNaN(params[keys[n]]) || keys[n] === 'employeeNo'
          ? params[keys[n]].toLowerCase()
          : params[keys[n]];

      if (value === 'true' || value === 'false') {
        value = value === 'true';
      }
      if (typeof value === 'boolean') {
        toMatch.push({
          ['$expr']: { $eq: [`$${keys[n]}`, value] },
        });
      } else {
        toMatch.push({
          ['$expr']: { $eq: [{ $toLower: `$${keys[n]}` }, `${value}`] },
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

  async aggregateFindByAttribute(
    key: any,
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
          ...key,
        },
      },

      ..._relations,
    ];

    return await this.entityModel.aggregate(pipeline);
  }

  async aggregateFindByEmployeeId(
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

  async search(entityFilterQuery?: any): Promise<T[]> {
    const pipeline = [...this.aggregateQry.values()];

    const relations = entityFilterQuery.relations;

    delete entityFilterQuery.relations;
    const params = entityFilterQuery;

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
    return this.entityModel.aggregate(pLine);
  }

  findLast() {
    return this.entityModel.findOne({}, {}, { sort: { employeeNo: -1 } });
  }
}
