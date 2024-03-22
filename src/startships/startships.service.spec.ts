import { Test, TestingModule } from '@nestjs/testing';
import { StartshipsService } from './startships.service';
import { HttpModule } from '@nestjs/axios';
import { BadRequestException } from '@nestjs/common';

describe('StartshipsService', () => {
  let service: StartshipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [StartshipsService],
    }).compile();

    service = module.get<StartshipsService>(StartshipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a new planet', () => {
    //Arrange
    service.starShips = [];
    const payload = 'Falcon';
    //Act
    const startship = service.createStarship(payload);
    //Assert
    expect(startship).toBe(payload);
    expect(service.starShips).toHaveLength(1);
  });

  it('should throw an error if the startShip is les than 2 characters long ', () => {
    //Arrange
    const payload = 'T';
    //Act
    const startShip = () => service.createStarship(payload);
    //Assert
    expect(startShip).toThrow();
  });

  describe('getStarship', () => {

    it('starship id is less than 2', async () => {
      const getStarship = () => service.getStarship(1);
      await expect(getStarship).rejects.toBeInstanceOf(BadRequestException);
    })

    it('starship id is greater than 32', async () => {
      const getStarship = () => service.getStarship(33);
      await expect(getStarship).rejects.toBeInstanceOf(BadRequestException);
    })

    it('should return starship data', async () => {
      const starship = await service.getStarship(3);
      expect(starship).toBeDefined();
      expect(starship.name).toBeDefined();
      expect(starship.model).toBeDefined();
    })

  })



});
