import { CreateTriggerDTO } from './DTO/create.trigger.dto';
import { TriggerRepository } from './trigger.repository';
import { Injectable } from '@nestjs/common';
import { Trigger } from './trigger.entity';

@Injectable()
export class TriggerService {

    constructor( private triggerRepository : TriggerRepository) {



    }
    


    async saveTrigger( createTriggerDto : CreateTriggerDTO) : Promise<Trigger>{



            return this.triggerRepository.saveTrigger(createTriggerDto)

    }



}
