import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEnumTableDto } from './dto/create-enum_table.dto';
import { UpdateEnumTableDto } from './dto/update-enum_table.dto';
import { EnumTableDocument, EnumsTable } from './entities/enum_table.entity';

@Injectable()
export class EnumTablesService {
  constructor(
    @InjectModel(EnumsTable.name)
    private enumTableModel: Model<EnumTableDocument>,
  ) {}
  async create(createEnumTableDto: CreateEnumTableDto) {
    const createEnumTable = new this.enumTableModel(createEnumTableDto);
    try {
      return await createEnumTable.save();
    } catch (error) {
      return error.message;
    }
  }

  async find(params?: any) {
    return await this.enumTableModel.find(params);
  }

  async update(code: string, updateEnumTableDto: UpdateEnumTableDto) {
    return this.enumTableModel.updateOne(
      { code },
      { $set: { ...updateEnumTableDto } },
    );
  }

  async remove(code: string) {
    const response = await this.enumTableModel.deleteOne({ code });

    return response;
  }
}
