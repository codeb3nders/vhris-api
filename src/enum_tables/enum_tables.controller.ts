import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
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
  find(@Query('type') type: string, @Query('code') code: string) {
    const params = {};

    if (type && code) {
      params['type'] = { $regex: new RegExp('^' + type.toLowerCase(), 'i') };
      params['code'] = { $regex: new RegExp('^' + code.toLowerCase(), 'i') };
    } else if (type) {
      params['type'] = { $regex: new RegExp('^' + type.toLowerCase(), 'i') };
    } else if (code) {
      params['code'] = { $regex: new RegExp('^' + code.toLowerCase(), 'i') };
    }

    return this.enumTablesService.find(params);
  }

  @Patch(':code')
  update(
    @Param('code') code: string,
    @Body() updateEnumTableDto: UpdateEnumTableDto,
  ) {
    return this.enumTablesService.update(code, updateEnumTableDto);
  }

  @Delete(':code')
  remove(@Param('code') code: string) {
    return this.enumTablesService.remove(code);
  }
}
