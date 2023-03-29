import { Test, TestingModule } from '@nestjs/testing';
import { SeedingFactoryService } from './seeding-factory.service';

describe('SeedingFactoryService', () => {
  let service: SeedingFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeedingFactoryService],
    }).compile();

    service = module.get<SeedingFactoryService>(SeedingFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
