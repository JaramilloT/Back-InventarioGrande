import { Controller, Get, Post, Body, Patch, Param, Delete, Put, BadRequestException } from '@nestjs/common';
import { FromService } from './from.service';
import { CreateFromDto } from './dto/create-from.dto';
import { UpdateFromDto } from './dto/update-from.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('formulario')
@ApiBearerAuth()
@Controller('from')
export class FromController {
  constructor(private readonly fromService: FromService) {}

  @Post()
  create(@Body() createFromDto: CreateFromDto) {
    return this.fromService.create(createFromDto);
  }

  @Get()
  findAll() {
    return this.fromService.findAll();
  }

  @Get(':id_inventario')
  findOne(@Param('id_inventario') id_inventario: number) {
    return this.fromService.findOne(+id_inventario);
  }

  @Put(':id_inventario')
  async update(
    @Param('id_inventario') id_inventario: number,
    @Body() updateFromDto: UpdateFromDto,
  ) {
    console.log('ID recibido:', id_inventario); // Imprime el ID recibido
    console.log('Datos del cuerpo recibido:', updateFromDto); // Imprime el cuerpo recibido
  
    if (!id_inventario) {
      throw new BadRequestException('El ID es obligatorio.');
    }
  
    if (!updateFromDto || Object.keys(updateFromDto).length === 0) {
      throw new BadRequestException('El cuerpo de la solicitud está vacío.');
    }
  
    return await this.fromService.update(id_inventario, updateFromDto);
  }
  
  

  @Delete(':id_inventario')
  remove(@Param('id_inventario') id_inventario: number) {
    return this.fromService.remove(+id_inventario);
  }
}
