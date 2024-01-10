import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonalData } from './entities/personal-data.entity';

@Injectable()
export class PersonalDataService {
  constructor(
    @InjectRepository(PersonalData)
    private readonly personalDataRepository: Repository<PersonalData>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createPersonalData(data: any): Promise<PersonalData> {
    try {
      const PersonalData = await this.personalDataRepository.save({
        name: 'Иван',
        surname: 'Иванов',
        patronymic: 'Иванович',
        birthdate: '1995-10-03',
        isMale: true,
        passport: 6622141241, // TODO: Надо поузнавать, есть ли специальный тип для паспортов
      });
      return PersonalData;
    } catch (err) {
      console.error(err);
    }
  }

  async getAllPersonalData(): Promise<PersonalData[]> {
    return await this.personalDataRepository.find();
  }
}
