import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_URI } from 'src/utils';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { databaseProviders } from './providers/database.providers';
import { notificationProviders } from './providers/notification.providers';
import { ExternalMicroserviceInterfaceService } from './external-microservice-interface/external-microservice-interface.service';
import { UiChannelService } from './ui-channel/ui-channel.service';
import { EmailChannelService } from './email-channel/email-channel.service';

@Module({
  imports: [],
  controllers: [NotificationController],
  providers: [
    NotificationService,
    ...notificationProviders,
    ...databaseProviders,
    ExternalMicroserviceInterfaceService,
    UiChannelService,
    EmailChannelService,
  ],
  exports: [...databaseProviders],
})
export class NotificationModule {}
