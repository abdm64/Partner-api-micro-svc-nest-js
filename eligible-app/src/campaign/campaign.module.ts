import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { Campaign } from './model/campaign.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([Campaign])
  ],
  providers: [CampaignService],
  controllers: [CampaignController],
  exports:[CampaignService]
})
export class CampaignModule {}
