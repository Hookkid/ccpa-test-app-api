import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config';

const proxy = require('express-http-proxy');

async function bootstrap() {
  const serverConfig = config.get('server');
  const logger = new Logger('bootstrap');
  logger.log(`env ${JSON.stringify(process.env)}`);
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(
    '/test/ccpa',
    proxy(`https://pr123--aaa-ncnu--digital-ccpa-dns.calstate.aaabeta.com`, {
      proxyReqPathResolver: req => `/endpoints/privacy-rights/v1`,
    })
  );

  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
