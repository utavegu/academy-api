import { Controller, Get, Post, Body } from '@nestjs/common';
import { LecturesService } from './lectures.service';

@Controller('lecture')
export class LecturesController {
  constructor(private readonly lecturesService: LecturesService) {}

  @Post()
  createLecture(@Body() data: any) {
    return this.lecturesService.createLecture(data);
  }

  @Get()
  getAllLectures() {
    return this.lecturesService.getAllLectures();
  }
}
