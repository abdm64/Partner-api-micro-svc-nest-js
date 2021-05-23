import { CreateCampaignDTO } from './DTO/create.campaign.dto';
import { Repository } from 'typeorm';
import { Campaign } from './model/campaign.entity';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment'





@Injectable()
export class CampaignService {
    constructor ( @InjectRepository(Campaign) private campaignRepository: Repository<Campaign>) {



    }


    async saveCamaign(createCampaignDTO : CreateCampaignDTO) : Promise<Campaign>{

            const { msisdn , nbr_transactions , triggerId , triggerDescription,} = createCampaignDTO
            let campaign  = new Campaign()
            campaign.msisdn = msisdn
            campaign.nbr_transactions= nbr_transactions
            campaign.triggerid = triggerId
            campaign.triggerdescription = triggerDescription
            
            const campaignOne = await this.campaignRepository.findOne({ msisdn })

            if(campaignOne){

                try{
                    this.campaignRepository.delete({ msisdn })
                    await campaign.save()
   
                 
               }catch(err){
                   console.log(err)
                   throw new InternalServerErrorException()
               }
               return campaign
               
            } else {

                await campaign.save()
                return campaign
                
            }



           

            
  

    }



    
}// class 
