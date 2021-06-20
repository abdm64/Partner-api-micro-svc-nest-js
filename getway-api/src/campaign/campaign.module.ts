import { NetworkService } from './helper/Network.service';
import { Module,HttpModule } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { ClientsModule, MicroserviceOptions, Transport } from '@nestjs/microservices';


import * as config from 'config';

const natsConfig = config.get('nats');
const redisConfig = config.get('redis')



@Module({
  imports: [HttpModule,
    ClientsModule.register([
      {
        name: 'CMS_SVC',
        transport: Transport.REDIS,
        options: {
          url:  process.env.REDIS_HOST ||  redisConfig.url ,
        }
      }
    ])
  
  ],
  controllers: [CampaignController],
  providers: [CampaignService,NetworkService]
})
export class CampaignModule {}
