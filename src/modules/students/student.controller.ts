import { Controller, Get, Post, Body } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  createStudent(@Body() { studentName }: { studentName: string }) {
    return this.studentService.createStudent(studentName);
  }

  @Get()
  getAllStudents() {
    return this.studentService.getAllStudents();
  }
}
