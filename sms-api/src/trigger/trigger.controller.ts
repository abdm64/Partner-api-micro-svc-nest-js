import { TriggerService } from './trigger.service';
import { CreateTriggerDTO } from './DTO/create.trigger.dto';
import { Trigger } from './trigger.entity';
import { Body, Controller, Get, Post } from '@nestjs/common';


@Controller('trigger')
export class TriggerController {

    constructor(private triggerService : TriggerService){


    }



    @Post()
    saveTrigger(@Body() createTriggerDTO: CreateTriggerDTO) : Promise<Trigger> {
      

        return this.triggerService.saveTrigger(createTriggerDTO)
    }

}
