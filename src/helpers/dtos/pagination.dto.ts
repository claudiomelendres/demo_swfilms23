import { Type } from "class-transformer";
import { IsIn, IsNumber, IsOptional, Min } from "class-validator";


export class PaginationDto {

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    limit?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    skip?: number;

    @IsOptional()
    @IsIn(['ASC', 'DESC', 'asc', 'desc'])
    order?: string;

    @IsOptional()
    query?: string;

}