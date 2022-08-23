import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EnumTablesService } from './enum_tables.service';
import { CreateEnumTableDto } from './dto/create-enum_table.dto';
import { UpdateEnumTableDto } from './dto/update-enum_table.dto';

@Controller('enums')
export class EnumTablesController {
  constructor(private readonly enumTablesService: EnumTablesService) {}

  @Post()
  create(@Body() createEnumTableDto: CreateEnumTableDto) {
    return this.enumTablesService.create(createEnumTableDto);
  }

  @Get()
  findAll() {
    return this.enumTablesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enumTablesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEnumTableDto: UpdateEnumTableDto,
  ) {
    return this.enumTablesService.update(+id, updateEnumTableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enumTablesService.remove(+id);
  }
}
