import { Controller, Get,  Param } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';

@Controller('campaign')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}


  

  @Get('eligible/:msisdn')
  findOne(@Param('msisdn') msisdn: string) : Promise<any> {
    return this.campaignService.findOne(+msisdn);
  }

 
}
