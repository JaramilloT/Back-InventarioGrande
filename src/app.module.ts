import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { FromModule } from './from/from.module';
import { From } from './from/entities/from.entity';
import { AuthModule } from './auth/auth.module';
import { ProtectedModule } from './protected/protected.module';
import { ExcelModule } from './reports/excel.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',      // Host del servidor MySQL (XAMPP corre en localhost)
    port: 3306,             // Puerto de MySQL (el puerto de XAMPP por defecto es 3306)
    username: 'root',       // El usuario por defecto de XAMPP es 'root'
    password: '',           // La contraseña por defecto de XAMPP es vacía
    database: 'inventario',       // Nombre de la base de datos que creaste en phpMyAdmin
    entities: [User, From],       // Asegúrate de que la entidad está importada
    synchronize: true,      // Solo para desarrollo, sincroniza automáticamente las tablas con las entidades
  }), 
  UserModule, 
  FromModule,
  AuthModule,
  ExcelModule,
  // ProtectedModule,
],
  controllers: [],
  providers: [],
})
export class AppModule {}
