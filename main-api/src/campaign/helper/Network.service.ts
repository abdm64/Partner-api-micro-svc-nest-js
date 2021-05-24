import {  HttpService,Injectable  } from '@nestjs/common';
import * as config from 'config';
import { DbssModel } from '../models/Dbss';

const dbss_api   = process.env.DBSS ||  config.get('dbss').url;

@Injectable()
export class NetworkService {

    constructor(private httpService: HttpService,){}

    async getDbssInfo(msisdn : number) : Promise<DbssModel>  {



        const response = await this.httpService.get(`${dbss_api}${msisdn}`).toPromise()
        
        
            
           
          
            
        //@ts-ignore
        return response.data
           
          }





}