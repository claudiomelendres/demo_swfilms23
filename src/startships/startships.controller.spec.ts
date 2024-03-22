import { Test, TestingModule } from '@nestjs/testing';
import { StartshipsController } from './startships.controller';
import { StartshipsService } from './startships.service';

describe('StartshipsController', () => {
  let controller: StartshipsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StartshipsController],
      providers: [StartshipsService],
    }).compile();

    controller = module.get<StartshipsController>(StartshipsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
