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
import { UserLogsService } from './user_logs.service';
import { CreateUserLogDto } from './dto/create-user_log.dto';
import { UpdateUserLogDto } from './dto/update-user_log.dto';
import { UserLogResponseHandler } from 'src/_utils/response_handler/user_log_handler.response';

@Controller('user-logs')
export class UserLogsController {
  constructor(
    private readonly userLogsService: UserLogsService,
    private readonly userLogResponseHandler: UserLogResponseHandler,
  ) {}

  @Post()
  create(@Body() createUserLogDto: CreateUserLogDto) {
    return this.userLogsService.create(createUserLogDto);
  }

  @Get()
  async findAll(@Query() params) {
    const response: any = await this.userLogsService.aggregateFind(params);

    if (!response || response.length < 1) {
      return response;
    }
    return this.userLogResponseHandler.ok(response);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const response = await this.userLogsService.findOne(id);
    if (!response || response.length < 1) {
      return response;
    }
    return this.userLogResponseHandler.ok(response);
  }

  @Get('employee/:employeeNo')
  async findByAttribute(@Param('employeeNo') employeeNo: string) {
    const response = await this.userLogsService.aggregateFindByAttribute({
      employeeNo,
    });

    if (!response || response.length < 1) {
      return response;
    }
    return this.userLogResponseHandler.ok(response);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserLogDto: UpdateUserLogDto) {
    return this.userLogsService.update(id, updateUserLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userLogsService.remove(id);
  }
}
