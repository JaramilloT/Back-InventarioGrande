import { Injectable } from '@nestjs/common';
import { CreateFromDto } from './dto/create-from.dto';
import { UpdateFromDto } from './dto/update-from.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { From } from './entities/from.entity';
import { NotFoundException } from '@nestjs/common';


@Injectable()
export class FromService {
  constructor(
    @InjectRepository(From)
    private fromRepository: Repository<From>
  ) {}
  create(createFromDto: CreateFromDto) {
    return this.fromRepository.save(createFromDto);
  }

// Servicio en el backend
async findAll(): Promise<From[]> {
  return this.fromRepository.find({
    select: ['id_inventario', 'dependencia', 'activo', 'codigo', 'responsable', 'cargo'],
  });
}


  findOne(id_inventario: number) {
    return this.fromRepository.findOneBy({id_inventario});
  }

  async update(id_inventario: number, updateFromDto: UpdateFromDto) {
    console.log('ID recibido en servicio:', id_inventario);
    console.log('Datos recibidos para actualizar:', updateFromDto);
  
    const item = await this.fromRepository.findOneBy({ id_inventario });
    console.log('Registro encontrado:', item);
  
    if (!item) {
      throw new Error(`Registro con id_inventario ${id_inventario} no encontrado`);
    }
  
    if (Object.keys(updateFromDto).length === 0) {
      throw new Error('No se proporcionaron datos para actualizar');
    }
  
    const updatedItem = await this.fromRepository.save({ ...item, ...updateFromDto });
    console.log('Registro actualizado:', updatedItem);
  
    return updatedItem;
  }
  
  

  remove(id_inventario: number) {
    return this.fromRepository.softDelete({id_inventario});
  }
}
