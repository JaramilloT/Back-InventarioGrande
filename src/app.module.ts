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
const port = process.env.PORT || 3000;
// mysql://root:TuZAgGWBkTfPYKKWqFJlltTpDxHsyffJ@interchange.proxy.rlwy.net:55995/railway 


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', 
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',  
      database: 'inventariogrande',
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