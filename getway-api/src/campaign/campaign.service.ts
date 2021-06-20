import { TriggerRepository } from './../../../cms-app/src/trigger/trigger.repository';
import { NetworkService } from './helper/Network.service';
import { EligibleModel } from './models/Eligible.model';
import { SmsModel } from './models/Sms.model';
import { Injectable,  InternalServerErrorException, HttpStatus, Inject,OnApplicationBootstrap,OnModuleInit, BadRequestException } from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { DbssModel } from './models/Dbss';
import * as moment from 'moment'
import { ClientProxy } from '@nestjs/microservices';





@Injectable()
export class CampaignService implements  OnModuleInit {



  constructor( 
              private networkService : NetworkService,
              @Inject('CMS_SVC') private readonly cmsServiceClient: ClientProxy,
             ){
                
              }

  // onApplicationBootstrap() {
  //   throw new Error('Method not implemented.');
  // }
          

            async onModuleInit() {
              await this.cmsServiceClient.connect();
              setInterval(async () => {
                try {
                  await this.cmsServiceClient.emit('healthcheck', 'healthcheck').toPromise();
                } catch (e) {
                  // Sending the message has failed, start recovery
                  console.error(e);
                  process.exit(1);
                }
              }, 1000);
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
        trigger_attr_01 : '1',
        trigger_attr_02 : createCampaignDto.trigger_attr_02,
        trigger_attr_03 : createCampaignDto.trigger_attr_03,
        trigger_attr_04 : createCampaignDto.trigger_attr_04,
        trigger_attr_05 : createCampaignDto.trigger_attr_05,
        trigger_attr_06 : createCampaignDto.trigger_attr_06,
        trigger_attr_07 : createCampaignDto.trigger_attr_07,
        trigger_attr_09 : profile, 
        trigger_attr_10: createCampaignDto.trigger_attr_10
      
        

   

}



// push sms object to redis
await  this.cmsServiceClient.send('save_trigger', smsTrigger).toPromise()

//create eligible object
const eligibleData : EligibleModel =  {
 
            msisdn : parseInt(msisdn.toString().substring(3)),
            triggerId : createCampaignDto.triggerId,
            triggerDescription: createCampaignDto.triggerDescription,
            nbr_transactions : createCampaignDto.nbr_transactions,
            trigger_attr_01 : '2',
            trigger_attr_06 : profile
  
  
}

 await this.cmsServiceClient.send('add_eligible', eligibleData).toPromise()





    } else {

      throw new BadRequestException('Profile Not eligible')
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
    AFK_TRIGGERID_MSISDN :" " ,
    trigger_attr_01 : '2',
    trigger_attr_02 : createCampaignDto.trigger_attr_02,
    trigger_attr_03 : createCampaignDto.trigger_attr_03,
    trigger_attr_04 : createCampaignDto.trigger_attr_04,
    trigger_attr_05 : createCampaignDto.trigger_attr_05,
    trigger_attr_06 : createCampaignDto.trigger_attr_06,
    trigger_attr_07 : createCampaignDto.trigger_attr_07,
    trigger_attr_09 : profile, 
    trigger_attr_10: createCampaignDto.trigger_attr_10

  



  }
const updateData = {
  msisdn : parseInt(msisdn.toString().substring(3)),
  triggerId : createCampaignDto.triggerId

}
  await this.cmsServiceClient.send('save_trigger', bonusTrigger)
  await this.cmsServiceClient.send('update_eligible_msisdn', updateData).toPromise()

  return HttpStatus.CREATED
  }




  

 
}
