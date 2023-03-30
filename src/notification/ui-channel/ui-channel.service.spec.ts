import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UiChannelService } from './ui-channel.service';
import { NOTIFICATION_MODEL } from '../shared_constants';
import { NotificationModule } from '../notification.module';

describe('UiChannelService', () => {
  let uiChannelService: UiChannelService;
  let notificationModel: Model<Notification>;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        UiChannelService,
        {
          provide: NOTIFICATION_MODEL,
          useValue: {
            create: jest.fn(),
            find: NotificationModule,
          },
        },
      ],
    }).compile();

    uiChannelService = app.get<UiChannelService>(UiChannelService);
    notificationModel = app.get<Model<Notification>>(NOTIFICATION_MODEL);
  });

  describe('createUINotification', () => {
    it('should create a UI notification successfully', async () => {
      const createData = {
        message: 'Test message',
        user_id: 1,
      };

      jest.spyOn(notificationModel, 'create').mockResolvedValueOnce(undefined);

      await uiChannelService.createUINotification(
        createData.message,
        createData.user_id,
      );

      expect(notificationModel.create).toHaveBeenCalledWith(createData);
    });
  });

  describe('listAllUINotificationsForUser', () => {
    it('should return a list of notifications for a user', async () => {
      const user_id = 123;
      const notifications = [
        { message: 'Test message 1', user_id: user_id },
        { message: 'Test message 2', user_id: user_id },
      ];

      jest.spyOn(notificationModel, 'find').mockResolvedValue(notifications);

      const result = await uiChannelService.listAllUINotificationsForUser(
        user_id,
      );

      expect(notificationModel.find).toBeCalledWith({ user_id: user_id });
      expect(result).toEqual(notifications);
    });
  });
});
