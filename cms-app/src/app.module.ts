import { Module } from '@nestjs/common';
import { TriggerModule } from './trigger/trigger.module'
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TriggerModule
  ],
  

})
export class AppModule {}
