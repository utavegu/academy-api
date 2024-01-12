import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auditorium } from './entities/auditorium.entity';

@Injectable()
export class AuditoriumsService {
  constructor(
    @InjectRepository(Auditorium)
    private readonly auditoriumRepository: Repository<Auditorium>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createAuditorium(_data): Promise<Auditorium> {
    const newAuditorium = await this.auditoriumRepository.save({
      auditoriumNumber: 102,
      auditoriumDescription:
        'Аудитория для занятий химией. Инвентарь и реагенты в наличии.',
    });
    return newAuditorium;
  }

  async getAllAuditoriums(): Promise<Auditorium[]> {
    return await this.auditoriumRepository.find();
  }
}
