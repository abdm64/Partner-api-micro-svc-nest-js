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

            const { msisdn , nbr_transactions , triggerId , triggerDescription, trigger_attr_06} = createCampaignDTO
            let campaign  = new Campaign()
            campaign.msisdn = msisdn
            campaign.nbr_transactions= nbr_transactions
            campaign.triggerId = triggerId
            campaign.triggerDescription = triggerDescription
            campaign.trigger_attr_06 =  trigger_attr_06

           
            const campaignOne = await this.campaignRepository.findOne({ msisdn, triggerId : triggerId })

            if(campaignOne){

                try{
                    this.campaignRepository.delete({ msisdn, triggerId : triggerId  })
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

    async updateEligible(msisdn : number, triggerId: string): Promise<Campaign>{
      

        const campaign = await this.campaignRepository.findOne( { 
            where :{ msisdn , triggerId}
        })

        if(campaign) {


            campaign.trigger_attr_01 = "2"

            campaign.save()
    
            return campaign
        } else {

            throw new NotFoundException()
        }
        





    }



    
}// class 
