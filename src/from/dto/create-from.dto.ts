import { Transform } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';

export class CreateFromDto {

    @IsString()
    @MinLength(1)
    dependencia: string;
  
    @IsString()
    @MinLength(1)
    activo: string;
  
    @IsString()
    @MinLength(1)
    codigo: string;
  
    @IsString()
    @MinLength(1)
    responsable: string;
      
    @IsString()
    @MinLength(1)
    cargo: string;
}
