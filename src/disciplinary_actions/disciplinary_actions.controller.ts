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
import { DisciplinaryActionResponseHandler } from 'src/utils/response_handler/disciplinary_actions_handler.response';
import { ErrorResponse } from 'src/utils/response_handler/error_response.util';
import { ValidatorsService } from 'src/validators/validators.service';
import { DisciplinaryActionsService } from './disciplinary_actions.service';
import { CreateDisciplinaryActionDto } from './dto/create-disciplinary_action.dto';
import { UpdateDisciplinaryActionDto } from './dto/update-disciplinary_action.dto';

const toCheck = ['violations'];

@Controller('disciplinary-actions')
export class DisciplinaryActionsController {
  constructor(
    private readonly disciplinaryActionsService: DisciplinaryActionsService,
    private validatorsService: ValidatorsService,
    private disciplinaryActionResponseHandler: DisciplinaryActionResponseHandler,
  ) {}

  @Post()
  async create(
    @Body() createDisciplinaryActionDto: CreateDisciplinaryActionDto,
  ) {
    try {
      await this.validatorsService.validateEmployeesPostRequest(
        createDisciplinaryActionDto,
        toCheck,
      );

      return await this.disciplinaryActionsService.create(
        createDisciplinaryActionDto,
      );
    } catch (error) {
      ErrorResponse.conflict(error.message || error);
    }
  }

  @Get()
  async findAll(@Query() params) {
    const response = await this.disciplinaryActionsService.findAll(params);
    if (!response || response.length < 1) {
      return response;
    }
    return this.disciplinaryActionResponseHandler.ok(response);
  }

  @Get(':employeeNo')
  async find(@Query() params: any, @Param('employeeNo') employeeNo: string) {
    const response = await this.disciplinaryActionsService.find(employeeNo);
    if (!response || response.length < 1) {
      return response;
    }
    return this.disciplinaryActionResponseHandler.ok(response);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeDocumentDto: UpdateDisciplinaryActionDto,
  ) {
    await this.validatorsService.validateEmployeesPostRequest(
      updateEmployeeDocumentDto,
      toCheck,
    );

    return await this.disciplinaryActionsService.update(
      id,
      updateEmployeeDocumentDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.disciplinaryActionsService.remove(id);
  }
}
