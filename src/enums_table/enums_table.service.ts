import { Injectable } from '@nestjs/common';
import { EnumsTableRepository } from 'src/_repositories/enums_table/enums_table.repository';
import { CreateEnumTableDto } from './dto/create-enum_table.dto';
import { UpdateEnumTableDto } from './dto/update-enum_table.dto';

@Injectable()
export class EnumTablesService {
  constructor(private enumsTableRepository: EnumsTableRepository) {}
  async create(createEnumTableDto: CreateEnumTableDto) {
    return await this.enumsTableRepository.create(createEnumTableDto);
  }

  async find(params?: any) {
    return await this.enumsTableRepository.find(params);
  }

  async update(code: string, updateEnumTableDto: UpdateEnumTableDto) {
    return this.enumsTableRepository.findOneAndUpdate(
      { code },
      { $set: { ...updateEnumTableDto } },
    );
  }

  async remove(code: string) {
    const response = await this.enumsTableRepository.deleteOne(code);

    return response;
  }
}
