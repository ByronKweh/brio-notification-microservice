import { Test, TestingModule } from '@nestjs/testing';
import { UiChannelService } from './ui-channel.service';

describe('UiChannelService', () => {
  let service: UiChannelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UiChannelService],
    }).compile();

    service = module.get<UiChannelService>(UiChannelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
