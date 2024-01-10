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

      // Когда будешь прокидывать реальные данные, тем не менее совсем моки не убирай - в постмановском формате (джейсон) их сохрани, чтобы в случае чего можно было легко тестировать
      const mockStudent = {
        personalData: { passport: 1234567890 },
        contact: { id: 1 },
        group: { groupName: 'ВМК-19-3' },
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
    // TODO: Забирать только интересуюшие поля из целевых таблиц (тут, вроде, все нужные, но вот пароль, у преподавателей, точно отдавать не надо, даже хэшированный)
    return await this.studentRepository.find({
      relations: {
        personalData: true,
        contact: true,
        group: true,
      },
    });
  }
}
