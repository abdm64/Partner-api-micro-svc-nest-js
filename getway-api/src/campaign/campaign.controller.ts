import { Controller, Post, Body } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';


@Controller('campaign')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post('sms')
  smsTrigger(@Body() createCampaignDto: CreateCampaignDto) {
    return this.campaignService.smsTrigger(createCampaignDto);
  }

  @Post('bonus')
  bonusTrigger(@Body() createCampaignDto: CreateCampaignDto) {
    return this.campaignService.bonusTrigger(createCampaignDto);
  }

  
}
