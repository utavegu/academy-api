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
      const PersonalData = await this.personalDataRepository.save(data);
      return PersonalData;
    } catch (err) {
      console.error(err);
    }
  }

  async findPerson(passport: PersonalData['passport']): Promise<any> {
    try {
      const person = await this.personalDataRepository.findOne({
        where: { passport: passport },
      });

      return person;
    } catch (err) {
      console.error(err);
    }
  }

  async getAllPersonalData(): Promise<PersonalData[]> {
    return await this.personalDataRepository.find();
  }
}
