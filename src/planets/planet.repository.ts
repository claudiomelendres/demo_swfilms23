import { BaseAbstractRepostitory } from "../database/base.repository";
import { Planet } from "./entities/planet.entity";
import { PlanetRepositoryInterface } from "./interfaces/planet.interface";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

export class PlanetRepository extends BaseAbstractRepostitory<Planet> implements PlanetRepositoryInterface {
    constructor(@InjectRepository(Planet) planetRepository: Repository<Planet>) {
        super(planetRepository)
    }
}