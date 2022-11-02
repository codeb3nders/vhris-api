import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TimeKeepingService } from './time_keeping.service';
import { CreateTimeKeepingDto } from './dto/create-time_keeping.dto';
import { UpdateTimeKeepingDto } from './dto/update-time_keeping.dto';

@Controller('time-keeping')
export class TimeKeepingController {
  constructor(private readonly timeKeepingService: TimeKeepingService) {}

  @Post()
  async create(@Body() createTimeKeepingDto: CreateTimeKeepingDto) {
    try {
      return await this.timeKeepingService.create(createTimeKeepingDto);
    } catch (error) {
      return error.response || error;
    }
  }

  @Get()
  findAll() {
    return this.timeKeepingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timeKeepingService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTimeKeepingDto: UpdateTimeKeepingDto,
  ) {
    return this.timeKeepingService.update(id, updateTimeKeepingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timeKeepingService.remove(id);
  }
}
