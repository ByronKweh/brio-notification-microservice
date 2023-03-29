import mongoose, { Connection } from 'mongoose';
import { DATABASE_CONNECTION, NOTIFICATION_MODEL } from '../shared_constants';
import { NotificationSchema } from '../schemas/notification.schema';

export const notificationProviders = [
  {
    provide: NOTIFICATION_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Notification', NotificationSchema),
    inject: [DATABASE_CONNECTION],
  },
];
