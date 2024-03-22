import { PartialType } from '@nestjs/mapped-types';
import { CreateStartshipDto } from './create-startship.dto';

export class UpdateStartshipDto extends PartialType(CreateStartshipDto) {}
