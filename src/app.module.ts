import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    TaskModule
  ]
})
export class AppModule {}
