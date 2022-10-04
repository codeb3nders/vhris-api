import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ErrorResponse } from 'src/helpers/error_response';
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
  ) {}

  @Post()
  async create(
    @Body() createDisciplinaryActionDto: CreateDisciplinaryActionDto,
  ) {
    console.log({ createDisciplinaryActionDto });
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
  findAll() {
    return this.disciplinaryActionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.disciplinaryActionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDisciplinaryActionDto: UpdateDisciplinaryActionDto,
  ) {
    return this.disciplinaryActionsService.update(
      +id,
      updateDisciplinaryActionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.disciplinaryActionsService.remove(+id);
  }
}
