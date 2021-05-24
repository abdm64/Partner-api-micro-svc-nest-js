import { NetworkService } from './helper/Network.service';
import { EligibleModel } from './models/Eligible.model';
import { SmsModel } from './models/Sms.model';
import { Injectable,  InternalServerErrorException, HttpStatus, Inject } from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { DbssModel } from './models/Dbss';
import * as moment from 'moment'
import { ClientProxy } from '@nestjs/microservices';





@Injectable()
export class CampaignService {



  constructor( 
              private networkService : NetworkService,
              @Inject('SMS_SVC') private readonly smsServiceClient: ClientProxy,
              @Inject('ELIGIBLE_SVC') private readonly eligibleServiceClient: ClientProxy,){
                
              }


 async smsTrigger(createCampaignDto: CreateCampaignDto): Promise<number>  {
    const msisdn = createCampaignDto.msisdn
    const dbssInfo : DbssModel= await   this.networkService.getDbssInfo(msisdn)
    const eligible = dbssInfo.eligible
    const profile = dbssInfo.profile

    

    if (eligible){
// create sms object 
const smsTrigger : SmsModel = {

        msisdn : msisdn.toString().substring(3),
        incomingTime : moment().utcOffset('+0100').format("YYYY-MM-DD HH:mm:ss"),
        triggerId : createCampaignDto.triggerId,
        id : "01",
        triggerDescription: createCampaignDto.triggerDescription ,
        isProcessed : 0,
        AFK_TRIGGERID_MSISDN : "abdm",
        TRIGGER_ATTR_09 : profile, 
        TRIGGER_ATTR_01 : '1'

}



// push sms object to redis
await  this.smsServiceClient.send('save_trigger', smsTrigger).toPromise()

//create eligible object
const eligibleData : EligibleModel =  {
 
            msisdn : parseInt(msisdn.toString().substring(3)),
            triggerId : createCampaignDto.triggerId,
            triggerDescription: createCampaignDto.triggerDescription,
            nbr_transactions : createCampaignDto.nbr_transactions,
            trigger_attr_01 : '1',
            trigger_attr_06 : profile
  
  
}

 await this.eligibleServiceClient.send('add_eligible', eligibleData).toPromise()





    } else {

      throw new InternalServerErrorException('Profile not eligibe')
    }
 
  

    return  HttpStatus.CREATED

  }



 async bonusTrigger(createCampaignDto: CreateCampaignDto) : Promise<number>{


  const msisdn = createCampaignDto.msisdn
  const dbssInfo : DbssModel= await   this.networkService.getDbssInfo(msisdn)
  const profile = dbssInfo.profile

  let bonusTrigger : SmsModel = {

    msisdn : msisdn.toString().substring(3),
    incomingTime : moment().utcOffset('+0100').format("YYYY-MM-DD HH:mm:ss"),
    triggerId : createCampaignDto.triggerId,
    id : "01",
    triggerDescription: createCampaignDto.triggerDescription ,
    isProcessed : 0,
    AFK_TRIGGERID_MSISDN :"ab" ,
    TRIGGER_ATTR_09 : profile, 
    TRIGGER_ATTR_01 : '1'



  }

  await this.smsServiceClient.send('save_trigger', bonusTrigger)
  await this.eligibleServiceClient.send('update_eligible_msisdn', parseInt(msisdn.toString().substring(3))).toPromise()

  return HttpStatus.CREATED
  }




  

 
}
