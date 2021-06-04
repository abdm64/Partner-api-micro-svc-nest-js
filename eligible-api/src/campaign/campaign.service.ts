
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign } from './entities/campaign.entity';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import * as moment from 'moment'


@Injectable()
export class CampaignService {
  constructor(@InjectRepository(Campaign) private campaignRepository: Repository<Campaign>,
            
  ){


    
  }
  

async  findOne(msisdnWorld: number): Promise<Campaign[]> {

    const msisdn = parseInt(msisdnWorld.toString().substring(3))
   // const campaignOne = await this.campaignRepository.findOne({ msisdn : msisdn, trigger_attr_01 : '1' })
  
    const campaignMulti = await (await this.campaignRepository.find({ msisdn, trigger_attr_01 : '1' }))
  

    const filterArray = this.filterEligible(campaignMulti)
   
   



    if(filterArray.length > 0){
      
      


      return  filterArray

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


filterEligible(campaignArray : Campaign[]) : Campaign[] {

   let filterdArray  = campaignArray.filter((elm) => {


return this.checkTime(elm.insertion_date)
   })
   
    filterdArray.map((elm)=> {

    delete elm.tabid
    elm.msisdn = parseInt(`213${elm.msisdn}`)



   })
 

   





return filterdArray

}


}//class 
