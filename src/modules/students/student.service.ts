import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createStudent(createStudentDto: any): Promise<Student> {
    try {
      // TODO: чтобы выкидывать ошибку на уникальность. Но вообще надо пока без этого просто трай-кэтч сделать
      // const isExistStudent = await this.studentRepository.findOne({ where: {
      //   passport: studentData.passport,
      // }})

      const mockStudent = {
        name: 'Сидор',
        surname: 'Иванов',
        patronymic: 'Петрович',
        passport: '1234567890', // TODO: Почему намбер не ешь? И надо поузнавать, есть ли специальный тип для паспортов
        group: { groupName: 'ВМК-19-3' },
      };

      const newStudent = await this.studentRepository.save(mockStudent);

      return newStudent;
    } catch (err) {
      console.error(err);
    }
  }

  async getAllStudents(): Promise<Student[]> {
    return await this.studentRepository.find();
  }
}
