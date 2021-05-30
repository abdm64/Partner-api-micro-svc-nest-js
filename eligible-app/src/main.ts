import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import * as config from 'config';
const natsConfig = config.get('nats');

async function bootstrap() {

  const redisOptions: MicroserviceOptions = {
    transport: Transport.NATS,
    options: {
      url:    process.env.REDIS_HOST ||  natsConfig.url ,
    },
  }
  
  const app = await NestFactory.createMicroservice(AppModule, redisOptions);
  app.useGlobalPipes(new ValidationPipe());

  app.listen(() => console.log('Eligible Service  is listening'));
  // app.setGlobalPrefix('dte/api/v1')
  // await app.listen(3000);
}
bootstrap();
