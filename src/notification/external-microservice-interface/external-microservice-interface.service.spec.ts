import { Test, TestingModule } from '@nestjs/testing';
import { ExternalMicroserviceInterfaceService } from './external-microservice-interface.service';

describe('ExternalMicroserviceInterfaceService', () => {
  let service: ExternalMicroserviceInterfaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExternalMicroserviceInterfaceService],
    }).compile();

    service = module.get<ExternalMicroserviceInterfaceService>(ExternalMicroserviceInterfaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
