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
  async createTeacher(contactData: any): Promise<Teacher> {
    try {
      const newTeacher = await this.teachersRepository.save({
        lastName: 'Никитин',
        contact: { id: 1 },
        disciplines: [{ id: 1 }, { id: 2 }],
      });
      return newTeacher;
    } catch (err) {
      console.error(err);
    }
  }

  async getAllTeachers(): Promise<Teacher[]> {
    return await this.teachersRepository.find({
      relations: {
        disciplines: true,
        contact: true,
      },
    });
  }
}
