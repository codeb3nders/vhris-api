import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist';
import {
  EnumsTableSchema,
  EnumsTable,
} from 'src/enum_tables/entities/enum_table.entity';
import { EnumTablesModule } from 'src/enum_tables/enum_tables.module';
import { EnumTablesService } from 'src/enum_tables/enum_tables.service';
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
