import { Module } from '@nestjs/common';
import { EnumTablesService } from './enums_table.service';
import { EnumTablesController } from './enums_table.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EnumsTableSchema, EnumsTable } from './entities/enums_table.entity';
import { EnumsTableRepository } from 'src/_repositories/enums_table/enums_table.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EnumsTable.name,
        schema: EnumsTableSchema,
      },
    ]),
  ],
  controllers: [EnumTablesController],
  providers: [EnumTablesService, EnumsTableRepository],
  exports: [EnumTablesService],
})
export class EnumTablesModule {}
