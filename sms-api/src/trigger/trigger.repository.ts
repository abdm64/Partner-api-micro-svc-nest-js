import { CreateTriggerDTO } from './DTO/create.trigger.dto';
import { Trigger } from './trigger.entity';
import { EntityRepository, Repository,getManager } from 'typeorm';
//import { CreateTriggerDto } from './dto/create.trigger.dto';
import { Logger, InternalServerErrorException } from '@nestjs/common';
import * as moment from 'moment';



@EntityRepository(Trigger)
export class TriggerRepository  extends Repository<Trigger>{

    async saveTrigger ( createTriggerDto : CreateTriggerDTO) : Promise<Trigger>{

        const {   msisdn,
            incomingTime, 
            triggerId, 
            isProcessed,  
            triggerDescription, 
            AFK_TRIGGERID_MSISDN 
        
        } = createTriggerDto
    
        const trigger = new Trigger() 

       trigger.msisdn = msisdn
      
       trigger.incomingTime = incomingTime
       trigger.triggerId = triggerId
       trigger.isProcessed = isProcessed
       trigger.triggerDescription = triggerDescription
       trigger. AFK_TRIGGERID_MSISDN = AFK_TRIGGERID_MSISDN


        
     

        const entityManager = getManager()
        try {
            const saveQuery = await  entityManager.query(`INSERT INTO [tbl_stg_imp_trigger_2018_03_23] 
            ([msisdn],[incomingTime],[triggerId],[isProcessed],
            [triggerDescription],[notificationTime],[id],[TRIGGER_ATTR_01],[TRIGGER_ATTR_02],
            [TRIGGER_ATTR_03],[TRIGGER_ATTR_04],[TRIGGER_ATTR_05],[TRIGGER_ATTR_06],[TRIGGER_ATTR_07]
            ,[TRIGGER_ATTR_08],[TRIGGER_ATTR_09]) 
            OUTPUT INSERTED.* 
            VALUES ('${msisdn}','${incomingTime}','${triggerId}',${isProcessed},
            '${triggerDescription}','${null}','${null}','${null}','${null}',
            '${null}','${null}','${null}','${null}','${null}',
            '${null}','${null}')
        
            
            `)
           // console.log( saveQuery)


return trigger
        } catch(err){
       console.log(err)
             throw new InternalServerErrorException();


        }

    

       


        
 
    }













}//class