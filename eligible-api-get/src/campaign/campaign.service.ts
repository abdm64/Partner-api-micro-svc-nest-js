import { Heetch } from './entities/heetch.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign } from './entities/campaign.entity';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import * as moment from 'moment'


@Injectable()
export class CampaignService {
  constructor(@InjectRepository(Campaign) private campaignRepository: Repository<Campaign>,
              @InjectRepository(Heetch) private heetchRepository: Repository<Heetch>
  ){


    
  }
  

async  findOne(msisdnWorld: number): Promise<CreateCampaignDto> {

    const msisdn = parseInt(msisdnWorld.toString().substring(3))
    const campaignOne = await this.campaignRepository.findOne({ msisdn : msisdn })
    const heetchOne = await this.heetchRepository.findOne({ msisdn : msisdn })
    const isDay = this.checkTime(campaignOne.insertion_date)
    const eligibleCampaign  = campaignOne && campaignOne.trigger_attr_01 === '1' && isDay



    if(eligibleCampaign){
      const campaign : CreateCampaignDto = {

        msisdn : parseInt(`213${campaignOne.msisdn}`),
        nbr_transactions : campaignOne.nbr_transactions,
        triggerId: campaignOne.triggerid,
        triggerDescription : campaignOne.triggerdescription,
        notificationtime : campaignOne.notificationtime || null,
        trigger_attr_01 : campaignOne.trigger_attr_01 || null,
        trigger_attr_02 : campaignOne.trigger_attr_02 || null,
        trigger_attr_03 : campaignOne.trigger_attr_03 || null,
        trigger_attr_04 : campaignOne.trigger_attr_04 || null,
        trigger_attr_05 : campaignOne.trigger_attr_05 || null,
        trigger_attr_06 : campaignOne.trigger_attr_06 || null,
        trigger_attr_07 : campaignOne.trigger_attr_07 || null,
        trigger_attr_08 : campaignOne.trigger_attr_08 || null,
        trigger_attr_09 : campaignOne.trigger_attr_09 || null,



      }


      return  campaign

    } else {


      throw new NotFoundException('msisdn not eligible')
    }



    
  }

  

 checkTime(item : Date) : boolean {
  var currentTime = moment();
  var timeStore = moment(item);
  const currectTimeSecond = currentTime.diff(timeStore, 's')

  return currectTimeSecond < 86400
 
}


}//class 
