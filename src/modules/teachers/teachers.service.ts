import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './entities/teacher.entity';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teachersRepository: Repository<Teacher>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createTeacher(data: any): Promise<Teacher> {
    try {
      const newTeacher = await this.teachersRepository.save({
        login: 'test',
        password: '12345',
        employmentDate: '2010-11-03',
        supervisedGroup: { groupName: 'ВМК-19-3' },
        contact: { phone: '+7-922-873-14-51' },
        disciplines: [
          { disciplineName: 'Математика' },
          { disciplineName: 'Русский язык' },
        ],
        personalData: { passport: 1234567890 },
      });
      return newTeacher;
    } catch (err) {
      console.error(err);
    }
  }

  async getAllTeachers(): Promise<Teacher[]> {
    return await this.teachersRepository.find({
      relations: {
        personalData: true,
        contact: true,
        disciplines: true,
      },
    });
  }
}
