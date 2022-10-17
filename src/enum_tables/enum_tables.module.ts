import { Module } from '@nestjs/common';
import { EnumTablesService } from './enum_tables.service';
import { EnumTablesController } from './enum_tables.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EnumTableSchema, EnumsTable } from './entities/enum_table.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EnumsTable.name,
        schema: EnumTableSchema,
      },
    ]),
  ],
  controllers: [EnumTablesController],
  providers: [EnumTablesService],
  exports: [EnumTablesService],
})
export class EnumTablesModule {}
