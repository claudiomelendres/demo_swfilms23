import { Test, TestingModule } from '@nestjs/testing';
import { StartshipsService } from './startships.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { BadRequestException } from '@nestjs/common';
import { DeepMocked, createMock } from '@golevelup/ts-jest';

describe('StartshipsService', () => {
  let service: StartshipsService;
  let httpService: DeepMocked<HttpService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StartshipsService,
        {
          provide: HttpService,
          useValue: createMock<HttpService>(),
        },
      ],
    }).compile();

    service = module.get<StartshipsService>(StartshipsService);
    httpService = module.get(HttpService);
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

      const starship = service.getStarship(5);
      const data = await starship;
      expect(data).toBeDefined();

      expect(JSON.stringify(data)).toBe(JSON.stringify({ name: 'Millennium Falcon', model: 'YT-1300 light freighter' })
      );
    })

  })



});
