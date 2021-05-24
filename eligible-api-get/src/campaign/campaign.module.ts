import { Heetch } from './entities/heetch.entity';
import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campaign } from './entities/campaign.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Campaign,Heetch])
  ],
  controllers: [CampaignController],
  providers: [CampaignService],
  exports:[CampaignService]
})
export class CampaignModule {}
