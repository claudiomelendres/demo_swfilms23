import { Test, TestingModule } from '@nestjs/testing';
import { StarshipsService } from './starships.service';
import { HttpService } from '@nestjs/axios';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { DeepMocked, createMock } from '@golevelup/ts-jest';

describe('StarshipsService', () => {
  let starShipsSrvice: StarshipsService;
  let httpService: DeepMocked<HttpService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StarshipsService],
    })
      .useMocker(createMock)
      .compile();

    starShipsSrvice = module.get<StarshipsService>(StarshipsService);
    httpService = module.get(HttpService);
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
      httpService.axiosRef.mockResolvedValue({
        data: {
          name: 'Millennium Falcon',
          model: 'YT-1300 light freighter'
        },
        headers: {},
        config: { url: '' },
        status: 200,
        statusText: '',
      });

      const starship = starShipsSrvice.getStarship(5);
      const data = await starship;
      expect(data).toBeDefined();

      expect(JSON.stringify(data)).toBe(JSON.stringify({ name: 'Millennium Falcon', model: 'YT-1300 light freighter' })
      );

    })

    it('should throw an error if the starship does not exist', async () => {
      httpService.axiosRef.mockResolvedValueOnce({
        response: {
          status: 404,
          statusText: 'Not found',
          headers: {},
          config: { url: '' },
          data: {}
        }
      });

      const starship = starShipsSrvice.getStarship(5);
      await expect(starship).rejects.toBeInstanceOf(InternalServerErrorException);
    })

  })


});
