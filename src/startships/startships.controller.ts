import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StartshipsService } from './startships.service';
import { CreateStartshipDto } from './dto/create-startship.dto';
import { UpdateStartshipDto } from './dto/update-startship.dto';

@Controller('startships')
export class StartshipsController {
  constructor(private readonly startshipsService: StartshipsService) { }

  @Post()
  create(@Body() createStartshipDto: CreateStartshipDto) {
    return this.startshipsService.create(createStartshipDto);
  }

  @Get()
  findAll() {
    return this.startshipsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.startshipsService.findOne(+id);
    return this.startshipsService.getStarship(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStartshipDto: UpdateStartshipDto) {
    return this.startshipsService.update(+id, updateStartshipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.startshipsService.remove(+id);
  }
}
