import { Module } from '@nestjs/common';
import { AdminModule } from './Admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [AdminModule,TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'ridwan',
    autoLoadEntities: true,
    synchronize: true,
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
