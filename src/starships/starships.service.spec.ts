import { Test, TestingModule } from '@nestjs/testing';
import { StarshipsService } from './starships.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { BadRequestException } from '@nestjs/common';

describe('StarshipsService', () => {
  let starShipsSrvice: StarshipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [StarshipsService],
    }).compile();

    starShipsSrvice = module.get<StarshipsService>(StarshipsService);

  });

  it('should be defined', () => {
    expect(starShipsSrvice).toBeDefined();
  });

  describe('createStartShip', () => {
    it('should add a new planet', () => {
      //Arrange
      starShipsSrvice.starShips = [];
      const payload = 'Falcon';
      //Act
      const startship = starShipsSrvice.createStarship(payload);
      //Assert
      expect(startship).toBe(payload);
      expect(starShipsSrvice.starShips).toHaveLength(1);
    });

    it('should throw an error if the startShip is les than 2 characters long ', () => {
      //Arrange
      const payload = 'T';
      //Act
      const startShip = () => starShipsSrvice.createStarship(payload);
      //Assert
      expect(startShip).toThrow();
    });
  })


  describe('getStarship', () => {

    it('starship id is less than 2', async () => {
      const getStarship = () => starShipsSrvice.getStarship(1);
      await expect(getStarship).rejects.toBeInstanceOf(BadRequestException);
    })

    it('starship id is greater than 32', async () => {
      const getStarship = () => starShipsSrvice.getStarship(33);
      await expect(getStarship).rejects.toBeInstanceOf(BadRequestException);
    })

    it('should return starship data', async () => {
      const starship = await starShipsSrvice.getStarship(3);
      expect(starship).toBeDefined();
      expect(starship.name).toBeDefined();
      expect(starship.model).toBeDefined();
    })

  })


});
