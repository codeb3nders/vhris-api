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
  providers: [DisciplinaryActionsService, ValidatorsService],
})
export class DisciplinaryActionsModule {}