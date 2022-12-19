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
import { EnumTablesService } from './enums_table.service';
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
  find(@Query() params) {
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
