
import { BaseInterfaceRepository } from "../../database/interfaces/base.interface";
import { Planet } from "../entities/planet.entity";


export interface PlanetRepositoryInterface extends BaseInterfaceRepository<Planet> { }