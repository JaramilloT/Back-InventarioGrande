import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { FromModule } from './from/from.module';
import { From } from './from/entities/from.entity';
import { AuthModule } from './auth/auth.module';
import { ProtectedModule } from './protected/protected.module';
import { ExcelModule } from './reports/excel.module'; 
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'inventarioGrande',
      entities: [User, From],
      synchronize: false,
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


// @Module({
//   imports: [
//     ConfigModule.forRoot({ isGlobal: true }), // <-- esto es indispensable
//     TypeOrmModule.forRoot({
//       type: 'mysql',
//       host: 'localhost',
//       port: 3306,
//       username: 'root',
//       password: 'jara123',
//       database: 'inventarioGrande',
//       entities: [User, From],
//       synchronize: false,
//     }),
//     UserModule,
//     FromModule,
//     AuthModule,
//     ExcelModule,
//   ],
// })
// export class AppModule {}

