import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lecture } from './entities/lecture.entity';
import { Workday } from './typespaces/enums/workdays.enum';

@Injectable()
export class LecturesService {
  constructor(
    @InjectRepository(Lecture)
    private readonly lectureRepository: Repository<Lecture>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createLecture(_data: any): Promise<Lecture> {
    const newLecture = this.lectureRepository.create({
      timeStart: '08:30',
      timeEnd: '09:50',
      weekday: Workday.MONDAY,
      lector: { id: 1 },
      discipline: { disciplineName: 'Математика' },
      auditorium: { auditoriumNumber: 102 },
      studentGroups: [{ groupName: 'ВМК-19-3' }],
    });
    return await this.lectureRepository.save(newLecture);
  }

  async getAllLectures(): Promise<Lecture[]> {
    return await this.lectureRepository.find({
      relations: {
        lector: {
          personalData: true,
        },
        discipline: true,
        studentGroups: true,
      },
    });
  }
}
