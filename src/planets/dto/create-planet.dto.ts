import { IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreatePlanetDto {

    @IsString()
    @MinLength(1)
    name: string

    @IsString()
    @IsOptional()
    climate: string;

    @IsOptional()
    @IsNumber()
    population: number;
}