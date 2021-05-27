import { TriggerService } from './trigger.service';
import { CreateTriggerDTO } from './DTO/create.trigger.dto';
import { Trigger } from './trigger.entity';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';


@Controller()
export class TriggerController {

    constructor(private triggerService : TriggerService){


    }



    @MessagePattern('save_trigger')
    saveTrigger( createTriggerDTO: CreateTriggerDTO) : Promise<Trigger> {
        
     

        return this.triggerService.saveTrigger(createTriggerDTO)
    }

}
