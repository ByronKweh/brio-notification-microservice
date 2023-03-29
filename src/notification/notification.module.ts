import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_URI } from 'src/utils';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { databaseProviders } from './providers/database.providers';
import { notificationProviders } from './providers/notification.providers';
import { UiNotificationServiceService } from './ui-notification-service/ui-notification-service.service';
import { SeedingFactoryService } from './seeding-factory/seeding-factory.service';
import { EmailNotificationService } from './email-notification/email-notification.service';

@Module({
  imports: [],
  controllers: [NotificationController],
  providers: [
    NotificationService,
    ...notificationProviders,
    ...databaseProviders,
    UiNotificationServiceService,
    SeedingFactoryService,
    EmailNotificationService,
  ],
  exports: [...databaseProviders],
})
export class NotificationModule {}
