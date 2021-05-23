import { Module,HttpModule } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { ClientsModule, MicroserviceOptions, Transport } from '@nestjs/microservices';

import * as config from 'config';

const redisConfig = config.get('redis');



@Module({
  imports: [
    HttpModule,
    ClientsModule.register([
      {
        name: 'SMS',
        transport: Transport.REDIS,
        options: {
          url:  process.env.REDIS ||  redisConfig.url ,
        }
      },
    ]),
  
  
  ],
  controllers: [CampaignController],
  providers: [CampaignService]
})
export class CampaignModule {}
