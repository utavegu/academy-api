import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuditoriumsService } from './auditorium.service';

@Controller('auditorium')
export class AuditoriumsController {
  constructor(private readonly auditoriumService: AuditoriumsService) {}

  @Post()
  createAuditorium(@Body() data: any) {
    return this.auditoriumService.createAuditorium(data);
  }

  @Get()
  getAllAuditoriums() {
    return this.auditoriumService.getAllAuditoriums();
  }
}
