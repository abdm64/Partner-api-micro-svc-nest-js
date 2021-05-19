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

            if(campaignOne && this.isDay(campaignOne.insertion_date) ){

                try{
                    this.campaignRepository.delete({ msisdn })
                    await campaign.save()
   
                 
               }catch(err){
                   console.log(err)
                   throw new InternalServerErrorException()
               }
               return campaign
               
            } else {

                throw new NotFoundException('already get bonus in 24 hours')
                
            }



           

            
  

    }



    isDay(insertionDate : Date)  : boolean {

        let dateInsert =  moment(insertionDate).unix()
        let dateNow = moment().utcOffset('+0100').unix()
        const defrentTime = dateNow  - dateInsert
        const day = 86400  - defrentTime 
    
    
    
    
    
    
     return day < 0
    }
}// class 
