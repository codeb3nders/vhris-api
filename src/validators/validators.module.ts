import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist';
import {
  EnumTableSchema,
  EnumsTable,
} from 'src/enum_tables/entities/enum_table.entity';
import { EnumTablesModule } from 'src/enum_tables/enum_tables.module';
import { EnumTablesService } from 'src/enum_tables/enum_tables.service';

@Module({
  imports: [
    EnumTablesModule,
    MongooseModule.forFeature([
      {
        name: EnumsTable.name,
        schema: EnumTableSchema,
      },
    ]),
  ],

  providers: [EnumTablesService],
  exports: [EnumTablesService],
})
export class ValidatorsModule {}
