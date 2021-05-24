import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignModule } from './campaign/campaign.module';
import { typeOrmConfig } from './config/typeorm.config';



@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    CampaignModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
