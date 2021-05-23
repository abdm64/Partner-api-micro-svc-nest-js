import { EligibleModel } from './models/Eligible.model';
import { SmsModel } from './models/Sms.model';
import { Injectable, HttpService, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import * as config from 'config';
import { DbssModel } from './models/Dbss';
import * as moment from 'moment'

const dbss_api   = process.env.DBSS ||  config.get('dbss').url;



@Injectable()
export class CampaignService {



  constructor(private httpService: HttpService){


  }


 async create(createCampaignDto: CreateCampaignDto): Promise<number>  {
    const msisdn = createCampaignDto.msisdn
    const dbssInfo : DbssModel= await   this.getDbssInfo(msisdn)
    const eligible = dbssInfo.eligible
    const profile = dbssInfo.profile

    if (eligible){
// create sms object 
const smsTrigger : SmsModel = {

        msisdn : msisdn.toString(),
        incomingTime : moment().utcOffset('+0100').format("YYYY-MM-DD HH:mm:ss"),
        triggerId : 'P0',
        id : "01",
        triggerDescription: "SMS",
        isProcessed : 0,
        AFK_TRIGGERID_MSISDN : "abdm",
        TRIGGER_ATTR_09 : profile

}

// push sms object to redis
//console.log(smsTrigger)

//create eligible object
const eligibleData : EligibleModel =  {
 
            msisdn : msisdn,
            triggerId : createCampaignDto.triggerId,
            triggerDescription: createCampaignDto.triggerDescription,
            nbr_transactions : createCampaignDto.nbr_transactions,
            trigger_attr_01 : '1',
            trigger_attr_06 : profile
  
  
}



// push eligible object to redis 
//console.log(eligibleData)


    } else {

      throw new InternalServerErrorException('Profile not eligibe')
    }
 
  

    return  HttpStatus.CREATED

  }

  async getDbssInfo(msisdn : number) : Promise<DbssModel>  {


const response = await this.httpService.get(`${dbss_api}213${msisdn}`).toPromise()


    
   
  
    
//@ts-ignore
return response.data
   
  }

 
}
