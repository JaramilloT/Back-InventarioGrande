import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';


export class CreateUserDto {
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    nombre: string;
  
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    apellido: string;
  
  
    @IsEmail()
    correo: string;
  
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(6)
    contraseña: string;
  
}
