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

  // any -> createStudentDto
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createStudent(studentData: any): Promise<Student> {
    try {
      // TODO: чтобы выкидывать ошибку на уникальность. Но вообще надо пока без этого просто трай-кэтч сделать
      // const isExistStudent = await this.studentRepository.findOne({ where: {
      //   passport: studentData.passport,
      // }})

      const mockStudent = {
        name: 'Сидор',
        surname: 'Иванов',
        patronymic: 'Петрович',
        passport: 1234567890, // TODO: Надо поузнавать, есть ли специальный тип для паспортов
        group: { groupName: 'ВМК-19-3' },
        contact: { id: 1 },
        /* TODO: Так... Группы-то будут созданы заранее, но вот контакты, по сути должны быть частью студента, но технически они должны быть созданы заранее. И это выглядит как транзакция:
        1) Отправляется форма с заполненными данными студента и его контактами
        2) Отправляется запрос в базу на создание контакта
        3) Если ок, то id этого контакта прицепляется к запросу на создание студента. Тут, вероятно, правильнее будет не пихать всё сразу в save, а разбить на несколько этапов - через create сначала.
        */
      };

      const newStudent = await this.studentRepository.save(mockStudent);

      return newStudent;
    } catch (err) {
      console.error(err);
    }
  }

  async getAllStudents(): Promise<Student[]> {
    // Ну и надо полноценный популэйт делать - забирать только интересуюшие поля из целевых таблиц.
    return await this.studentRepository.find({
      relations: {
        group: true,
        contact: true,
      },
    });
  }
}
