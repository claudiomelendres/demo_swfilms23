import { Test, TestingModule } from '@nestjs/testing';
import { StartshipsService } from './startships.service';

describe('StartshipsService', () => {
  let service: StartshipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

});
