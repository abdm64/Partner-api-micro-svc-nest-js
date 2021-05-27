import { TriggerRepository } from './trigger.repository';
import { Module } from '@nestjs/common';
import { TriggerService } from './trigger.service';
import { TriggerController } from './trigger.controller';
import { TypeOrmModule } from '@nestjs/typeorm';






@Module({
  imports: [
    TypeOrmModule.forFeature([TriggerRepository])

  ],
  controllers: [TriggerController],
  providers: [ TriggerService],
})
export class TriggerModule {}