import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ExcelService } from './excel.service';
import { FromService } from '../from/from.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('reporte')
@ApiBearerAuth()
@Controller('excel')
export class ExcelController {
  constructor(
    private readonly excelService: ExcelService,
    private readonly fromService: FromService, // Inyección del servicio
  ) {}

  @Get('download')
  async downloadExcel(@Res() res: Response): Promise<void> {
    // Obtén los datos desde la base de datos
    const data = await this.fromService.findAll();

    // Genera y envía el archivo Excel con los datos
    await this.excelService.generateExcel(res, data);
  }
}
