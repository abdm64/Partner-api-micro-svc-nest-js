import { CampaignService } from './campaign.service';
import { CreateCampaignDTO } from './DTO/create.campaign.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Campaign } from './model/campaign.entity';

@Controller('campaign/eligible')
export class CampaignController {

    constructor(private campaignService : CampaignService) {


    }



    @Post()
   saveCampaign( @Body() createCampaignDTO : CreateCampaignDTO) : Promise<Campaign> {


    return this.campaignService.saveCamaign(createCampaignDTO)




    }
}
