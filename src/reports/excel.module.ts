import { Module } from '@nestjs/common';
import { ExcelController } from './excel.controller';
import { ExcelService } from './excel.service';
import { FromModule } from 'src/from/from.module';

@Module({
   imports: [FromModule],
  controllers: [ExcelController],
  providers: [ExcelService],
})
export class ExcelModule {}
