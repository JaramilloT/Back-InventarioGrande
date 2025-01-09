import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { Response } from 'express';

@Injectable()
export class ExcelService {
  async generateExcel(res: Response, data: any[]): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reporte');

    // Definir las columnas basadas en los campos de la entidad From
    worksheet.columns = [
      { header: 'Dependencia', key: 'dependencia', width: 30 },
      { header: 'Activo', key: 'activo', width: 15 },
      { header: 'Código', key: 'codigo', width: 20 },
      { header: 'Responsable', key: 'responsable', width: 30 },
      { header: 'Cargo', key: 'cargo', width: 30 },
    ];

    // Agregar las filas de datos
    data.forEach((item) => {
      worksheet.addRow(item);
    });

    // Estilizar encabezados
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });

    // Configurar encabezados para la respuesta
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=report.xlsx',
    );

    // Escribir el archivo en la respuesta
    await workbook.xlsx.write(res);
    // Finalizar la respuesta
    res.end();
  }
}
