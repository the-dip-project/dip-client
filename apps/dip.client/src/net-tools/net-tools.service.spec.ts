import { Test, TestingModule } from '@nestjs/testing';

import { NetToolsService } from './net-tools.service';

describe('NetToolsService', () => {
  let service: NetToolsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NetToolsService],
    }).compile();

    service = module.get<NetToolsService>(NetToolsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
