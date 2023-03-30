import { Test, TestingModule } from '@nestjs/testing';
import { EmailChannelService, SendEmailDTO } from './email-channel.service';

describe('EmailChannelService', () => {
  let emailService: EmailChannelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailChannelService],
    }).compile();

    emailService = module.get<EmailChannelService>(EmailChannelService);
  });

  describe('service is defined', () => {
    it('should be defined', () => {
      expect(emailService).toBeDefined();
    });
  });

  describe('should console log', () => {
    it('should send an email successfully', async () => {
      const sendEmailData: SendEmailDTO = {
        email: 'john@example.com',
        subject: 'test test',
        content: 'test2',
      };

      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      await emailService.sendEmail(sendEmailData);

      expect(consoleSpy).toHaveBeenCalledWith(
        `email_sent: ${JSON.stringify(sendEmailData)}`,
      );
    });
  });
});
