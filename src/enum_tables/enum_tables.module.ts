import { Module } from '@nestjs/common';
import { EnumTablesService } from './enum_tables.service';
import { EnumTablesController } from './enum_tables.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EnumTableSchema, Enum_Table } from './entities/enum_table.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Enum_Table.name,
        schema: EnumTableSchema,
      },
    ]),
  ],
  controllers: [EnumTablesController],
  providers: [EnumTablesService],
})
export class EnumTablesModule {}
