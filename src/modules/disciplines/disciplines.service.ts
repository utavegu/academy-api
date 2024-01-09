import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discipline } from './entities/discipline.entity';

@Injectable()
export class DisciplinesService {
  constructor(
    @InjectRepository(Discipline)
    private readonly disciplinesRepository: Repository<Discipline>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createDiscipline(contactData: any): Promise<Discipline[]> {
    try {
      const newDiscipline = await this.disciplinesRepository.save({
        disciplineName: 'Математика',
        disciplineDescription: 'Про сложение и вычитание',
      });
      const newDiscipline2 = await this.disciplinesRepository.save({
        disciplineName: 'Русский язык',
        disciplineDescription: 'Про буквы и слова',
      });
      return [newDiscipline, newDiscipline2];
    } catch (err) {
      console.error(err);
    }
  }

  async getAllDisciplines(): Promise<Discipline[]> {
    return await this.disciplinesRepository.find();
  }
}
