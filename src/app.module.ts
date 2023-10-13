import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeDatabase } from './database/sequelize.options';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({ dialect: 'postgres', ...SequelizeDatabase }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
