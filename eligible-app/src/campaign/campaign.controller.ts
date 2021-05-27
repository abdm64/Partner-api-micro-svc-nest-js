import { CampaignService } from './campaign.service';
import { CreateCampaignDTO } from './DTO/create.campaign.dto';
import {  Controller } from '@nestjs/common';
import { Campaign } from './model/campaign.entity';
import { MessagePattern } from '@nestjs/microservices';

@Controller('campaign/eligible')
export class CampaignController {

    constructor(private campaignService : CampaignService) {


    }



   // @Post()
    @MessagePattern('add_eligible')
   saveCampaign(createCampaignDTO : CreateCampaignDTO) : Promise<Campaign> {


    return this.campaignService.saveCamaign(createCampaignDTO)

    }

   // @Put('/:msisdn')
    @MessagePattern('update_eligible_msisdn')
    updateCampaign(update : any ): Promise<Campaign> {
        let msisdn = update.msisdn
        let triggerId = update.triggerId

        return this.campaignService.updateEligible(msisdn,triggerId)
    }
}
