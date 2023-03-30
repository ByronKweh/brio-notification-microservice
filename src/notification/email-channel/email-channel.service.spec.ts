import { Test, TestingModule } from '@nestjs/testing';
import { EmailChannelService } from './email-channel.service';

describe('EmailChannelService', () => {
  let service: EmailChannelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailChannelService],
    }).compile();

    service = module.get<EmailChannelService>(EmailChannelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
