import { Test, TestingModule } from '@nestjs/testing';
import { StarshipsController } from './starships.controller';
import { StarshipsService } from './starships.service';
import { HttpModule } from '@nestjs/axios';

describe('StarshipsController', () => {
  let controller: StarshipsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [StarshipsController],
      providers: [StarshipsService],
    }).compile();

    controller = module.get<StarshipsController>(StarshipsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
