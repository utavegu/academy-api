import { Controller, Get, Post, Body } from '@nestjs/common';
import { TeachersService } from './teachers.service';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  createTeacher(@Body() data: any) {
    return this.teachersService.createTeacher(data);
  }

  @Get()
  getAllTeachers() {
    return this.teachersService.getAllTeachers();
  }
}
