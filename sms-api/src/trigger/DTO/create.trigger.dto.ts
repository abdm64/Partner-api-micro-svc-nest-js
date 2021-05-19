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


    data_01:  string ;
    data_02:  string ;
    data_03:  string ;
    data_04:  string ;

    data_05:  string ;

    data_06:  string ;
    data_07:  string ;
    data_08:  string ;
    data_09:  string ;

    data_10:  string ;





}