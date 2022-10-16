import { Module } from '@nestjs/common';
import { DisciplinaryActionsService } from './disciplinary_actions.service';
import { DisciplinaryActionsController } from './disciplinary_actions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ValidatorsModule } from 'src/validators/validators.module';
import {
  DisciplinaryAction,
  DisciplinaryActionSchema,
} from './entities/disciplinary_action.entity';
import { ValidatorsService } from 'src/validators/validators.service';
import { DisciplinaryActionResponseHandler } from 'src/response_handler/disciplinary_actions_handler.response';

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
  ],
})
export class DisciplinaryActionsModule {}
