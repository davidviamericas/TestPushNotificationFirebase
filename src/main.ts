import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ConfigService } from '@nestjs/config';

// Import firebase-admin
import * as admin from 'firebase-admin';
import { ServiceAccount } from "firebase-admin";

async function bootstrap() {
  /*const app = await NestFactory.create(AppModule);
  await app.listen(3002);*/

  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const credentials = require(configService.get<string>('GOOGLE_APPLICATION_CREDENTIALS'));
  // Set the config options
  /*const adminConfig: ServiceAccount = {
    "projectId": configService.get<string>('FIREBASE_PROJECT_ID'),
    "privateKey": configService.get<string>('FIREBASE_PRIVATE_KEY')
                               .replace(/\\n/g, '\n'),
    "clientEmail": configService.get<string>('FIREBASE_CLIENT_EMAIL'),
  };*/
  // Initialize the firebase admin app
  admin.initializeApp({
    credential: admin.credential.cert(credentials),
    //databaseURL: "https://xxxxx.firebaseio.com",
  });

  app.enableCors();

  await app.listen(configService.get<string>('API_PORT') || 4000);
}
bootstrap();
