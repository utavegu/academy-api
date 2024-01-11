import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { PersonalData } from './entities/personal-data.entity';

@Injectable()
export class PersonalDataService {
  constructor(
    @InjectRepository(PersonalData)
    private readonly personalDataRepository: Repository<PersonalData>,
  ) {}

  async createPersonalData(data: any): Promise<PersonalData> {
    try {
      const personalData = await this.findPersonalDataByPassport(data.passport);
      if (personalData) {
        throw new BadRequestException('Такой паспорт уже внесен в базу!');
      }
      const newPersonalData = await this.personalDataRepository.save(data);
      return newPersonalData;
    } catch (err) {
      throw new HttpException(err.message, err.status || 500);
    }
  }

  async findPersonalDataByPassport(
    passport: PersonalData['passport'],
  ): Promise<PersonalData> {
    try {
      const personalData = await this.personalDataRepository.findOne({
        where: { passport },
      });

      return personalData;
    } catch (err) {
      console.error(err);
    }
  }

  async getAllPersonalData(): Promise<PersonalData[]> {
    return await this.personalDataRepository.find();
  }

  async updatePersonalData(
    passport: PersonalData['passport'],
    data: Omit<PersonalData, 'passport' | 'student' | 'teacher'>,
  ): Promise<UpdateResult> {
    try {
      const updateResult = await this.personalDataRepository.update(
        passport,
        data,
      );
      if (!updateResult.affected) {
        throw new BadRequestException('Ошибка обновления персональных данных!');
      }
      return updateResult;
    } catch (err) {
      throw new HttpException(err.message, err.status || 500);
    }
  }
}
