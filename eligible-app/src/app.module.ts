import { Module } from '@nestjs/common';
import { CampaignModule } from './campaign/campaign.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    CampaignModule
  
  ]

})
export class AppModule {}
