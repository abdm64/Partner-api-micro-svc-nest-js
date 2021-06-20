import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTriggerDTO {


    @IsNotEmpty()
    msisdn: string


    @IsNotEmpty()
    incomingTime : Date
    @IsNotEmpty()
    triggerId:  string;
    @IsNotEmpty()
    @IsNumber()
    isProcessed:  string;
    @IsNotEmpty()
    triggerDescription:  string ;
    @IsNotEmpty()
    AFK_TRIGGERID_MSISDN:  string ;

    

    aggregateId:  string ;


    notificationTime:  string ;

    id:  string ;


    trigger_attr_01:  string ;
    trigger_attr_02:  string ;
    trigger_attr_03:  string ;
    trigger_attr_04:  string ;
    trigger_attr_05:  string ;
    trigger_attr_06:  string ;
    trigger_attr_07:  string ;
    trigger_attr_08:  string ;
    trigger_attr_09:  string ;
    trigger_attr_10:  string ;


    


}