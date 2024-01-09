import { Controller, Get, Post, Body } from '@nestjs/common';
import { DisciplinesService } from './disciplines.service';

@Controller('disciplines')
export class DisciplinesController {
  constructor(private readonly disciplinesService: DisciplinesService) {}

  @Post()
  createDiscipline(@Body() data: any) {
    return this.disciplinesService.createDiscipline(data);
  }

  @Get()
  getAllDisciplines() {
    return this.disciplinesService.getAllDisciplines();
  }
}
