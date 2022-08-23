import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEnumTableDto } from './dto/create-enum_table.dto';
import { UpdateEnumTableDto } from './dto/update-enum_table.dto';
import { EnumTableDocument, Enum_Table } from './entities/enum_table.entity';

@Injectable()
export class EnumTablesService {
  constructor(
    @InjectModel(Enum_Table.name)
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

  async findAll() {
    return await this.enumTableModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} enumTable`;
  }

  update(id: number, updateEnumTableDto: UpdateEnumTableDto) {
    return `This action updates a #${id} enumTable`;
  }

  remove(id: number) {
    return `This action removes a #${id} enumTable`;
  }
}
