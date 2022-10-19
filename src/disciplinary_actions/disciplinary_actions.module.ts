import { Module } from '@nestjs/common';
import { DisciplinaryActionsService } from './disciplinary_actions.service';
import { DisciplinaryActionsController } from './disciplinary_actions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ValidatorsModule } from 'src/_validators/validators.module';
import {
  DisciplinaryAction,
  DisciplinaryActionSchema,
} from './entities/disciplinary_action.entity';
import { ValidatorsService } from 'src/_validators/validators.service';
import { DisciplinaryActionResponseHandler } from 'src/_utils/response_handler/disciplinary_actions_handler.response';
import { DisciplinaryActionRepository } from 'src/_repositories/disciplinary_actions/disciplinary_actions.repository';
import { AggregateDisciplinaryAction } from 'src/_aggregates/disciplinary_actions.aggregate';

@Module({
  imports: [
    ValidatorsModule,
    MongooseModule.forFeature([
      {
        name: DisciplinaryAction.name,
        schema: DisciplinaryActionSchema,
      },
    ]),
  ],
  controllers: [DisciplinaryActionsController],
  providers: [
    DisciplinaryActionsService,
    ValidatorsService,
    DisciplinaryActionResponseHandler,
    DisciplinaryActionRepository,
    AggregateDisciplinaryAction,
  ],
})
export class DisciplinaryActionsModule {}
