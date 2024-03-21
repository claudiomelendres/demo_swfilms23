import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';

@Controller('starships')
export class StarshipsController {
  constructor(private readonly starshipsService: StarshipsService) { }

  @Post()
  create(@Body() createStarshipDto: CreateStarshipDto) {
    return this.starshipsService.create(createStarshipDto);
  }

  @Get()
  findAll() {
    return this.starshipsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.starshipsService.findOne(+id);
    return this.starshipsService.getStarship(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStarshipDto: UpdateStarshipDto) {
    return this.starshipsService.update(+id, updateStarshipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.starshipsService.remove(+id);
  }
}
