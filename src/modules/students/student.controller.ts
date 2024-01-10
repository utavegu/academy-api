import { Controller, Get, Post, Body } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  createStudent(@Body() studentData: CreateStudentDto) {
    return this.studentService.createStudent(studentData);
  }

  @Get()
  getAllStudents() {
    return this.studentService.getAllStudents();
  }
}
