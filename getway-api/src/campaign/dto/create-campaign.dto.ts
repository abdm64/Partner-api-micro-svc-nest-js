

import { IsNotEmpty, IsNumber, Length } from 'class-validator';


export class CreateCampaignDto {


    
    @IsNotEmpty()
    @IsNumber()
   // @Length(10)
    msisdn: number



    @IsNumber()
    nbr_transactions : number

   
    @IsNotEmpty()
    triggerId:  string;


   
    @IsNotEmpty()
    triggerDescription:  string ;
  

    

  


 
    notificationtime: Date

    
 
    trigger_attr_01 : string

    
  
    trigger_attr_02 : string

    
 
    trigger_attr_03 : string


    trigger_attr_04 : string

    
   
    trigger_attr_05: string

    
  
    trigger_attr_06: string

 
    trigger_attr_07 : string

    
 
    trigger_attr_08: string

 
    trigger_attr_09: string

  
    trigger_attr_10: string


    



    
}