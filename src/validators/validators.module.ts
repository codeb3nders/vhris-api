import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist';
import {
  EnumsTableSchema,
  EnumsTable,
} from 'src/enums_table/entities/enums_table.entity';
import { EnumTablesModule } from 'src/enums_table/enums_table.module';
import { EnumTablesService } from 'src/enums_table/enums_table.service';
import { EnumsTableRepository } from 'src/_repositories/enums_table/enums_table.repository';

@Module({
  imports: [
    EnumTablesModule,
    MongooseModule.forFeature([
      {
        name: EnumsTable.name,
        schema: EnumsTableSchema,
      },
    ]),
  ],

  providers: [EnumTablesService, EnumsTableRepository],
  exports: [EnumTablesService],
})
export class ValidatorsModule {}
