import { User } from './../user/entities/user.entity';
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { RegisterDto } from "./dto/register.dto";
import * as bcrypt from 'bcryptjs';
import { LoginDto } from "./dto/login.dto";
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService{
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
      ) {}

    async register({nombre, apellido, correo, contraseña}: RegisterDto){
        const user = await this.userService.findOneByEmail(correo);
        
        if (user) {
            throw new BadRequestException("el usuario ya es existente")
        }
      
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        return await this.userService.create({
            nombre,
            apellido,
            correo,
            contraseña: hashedPassword,
          
        })
    }

    async login({ correo, contraseña }: LoginDto) {
        const user = await this.userService.findOneByEmail(correo);
    
        if (!user) {
          throw new UnauthorizedException('El correo electrónico es incorrecto');
        }
    
        const isPasswordValid = await bcrypt.compare(contraseña, user.contraseña);
        if (!isPasswordValid) {
          throw new UnauthorizedException('La contraseña es incorrecta');
        }
    
        // Generar un token JWT con la información del usuario
        const payload = { sub: user.id_usuario, nombre: user.nombre, apellido: user.apellido };
        const token = this.jwtService.sign(payload, {
          secret: this.configService.get('JWT_SECRET'),
          expiresIn: '1h',
        });
    
        // Retornar el usuario y el token
        return {
          user: {
            id: user.id_usuario,
            nombre: user.nombre,
            apellido: user.apellido,
            correo: user.correo,
          },
          token,
        };
      }

      async getProfile(userId: number) {
        const user = await this.userService.findOne(userId);
        if (!user) {
          throw new UnauthorizedException('Usuario no encontrado');
        }
        return { id: user.id_usuario, nombre: user.nombre, apellido: user.apellido, correo: user.correo };
      }
      
    // generateJwt(payload: any): string {
    //     return this.jwtService.sign(payload);
    //   }
}