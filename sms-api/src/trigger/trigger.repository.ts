import { CreateTriggerDTO } from './DTO/create.trigger.dto';
import { Trigger } from './trigger.entity';
import { EntityRepository, Repository,getManager } from 'typeorm';

import {  InternalServerErrorException } from '@nestjs/common';




@EntityRepository(Trigger)
export class TriggerRepository  extends Repository<Trigger>{

    async saveTrigger ( createTriggerDto : CreateTriggerDTO) : Promise<Trigger>{

        const {   msisdn,
            incomingTime, 
            triggerId, 
            isProcessed,  
            triggerDescription, 
            AFK_TRIGGERID_MSISDN ,
            id,
            
            aggregateId,
           
            


        
        } = createTriggerDto
        const notificationTime = createTriggerDto.notificationTime || null
        

        const data_01 = createTriggerDto.data_01 || null
        const data_02 = createTriggerDto.data_02 || null
        const data_03 = createTriggerDto.data_03 || null
        const data_04 = createTriggerDto.data_04 || null
        const data_05 = createTriggerDto.data_05 || null
        const data_06 = createTriggerDto.data_06 || null
        const data_07 = createTriggerDto.data_07 || null
        const data_08 = createTriggerDto.data_08 || null
        const data_09 = createTriggerDto.data_09 || null
   
        const trigger = new Trigger() 

       trigger.msisdn = msisdn
      
       trigger.incomingTime = incomingTime
       trigger.triggerId = triggerId
       trigger.isProcessed = isProcessed
       trigger.triggerDescription = triggerDescription
       trigger.AFK_TRIGGERID_MSISDN = AFK_TRIGGERID_MSISDN


        
     

        const entityManager = getManager()
        try {
            const saveQuery = await  entityManager.query(`
            INSERT INTO [tbl_stg_imp_trigger_2018_03_23] 
			([msisdn],[incomingTime],[triggerId],[isProcessed],
			[triggerDescription],[notificationTime],[id],[TRIGGER_ATTR_01],[TRIGGER_ATTR_02],
			[TRIGGER_ATTR_03],[TRIGGER_ATTR_04],[TRIGGER_ATTR_05],[TRIGGER_ATTR_06],[TRIGGER_ATTR_07]
			,[TRIGGER_ATTR_08],[TRIGGER_ATTR_09]) 
			OUTPUT INSERTED.* 
			VALUES ('${msisdn}','${incomingTime}','${triggerId}',${isProcessed},
			'${triggerDescription}','${notificationTime}','${id}','${data_01}','${data_02}',
			'${data_03}','${data_04}','${data_05}','${data_06}','${data_07}',
			'${data_08}','${data_09}')
            
            
            
            `)
            //console.log( saveQuery)


return trigger
        } catch(err){
       console.log(err)
             throw new InternalServerErrorException();


        }

    

       


        
 
    }













}//class