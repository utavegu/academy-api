import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { Student } from './entities/student.entity';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { IStudentsQueryParams } from './typespaces/IStudentsQueryParams';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  createStudent(@Body() studentData: CreateStudentDto) {
    return this.studentService.createStudent(studentData);
  }

  @Get()
  getAllStudents(@Query() queryParams: IStudentsQueryParams) {
    return this.studentService.getAllStudents(queryParams);
  }

  @Get(':id')
  getStudentById(@Param('id') id: Student['id']) {
    return this.studentService.getStudentById(id);
  }

  @Delete(':id')
  removeStudentById(@Param('id') id: Student['id']) {
    return this.studentService.removeStudentById(id);
  }

  @Put(':id')
  updateStudent(
    @Param('id') id: Student['id'],
    @Body() data: UpdateStudentDto,
  ) {
    return this.studentService.updateStudent(id, data);
  }
}
