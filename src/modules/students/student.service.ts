/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonalDataService } from '../personal-data/personal-data.service';
import { ContactsService } from '../contacts/contacts.service';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly personalDataService: PersonalDataService,
    private readonly contactsService: ContactsService,
  ) {}

  // TODO: Транзакция!
  async createStudent({
    passport,
    name,
    surname,
    patronymic,
    birthdate,
    isMale,
    phone,
    email,
    country,
    city,
    street,
    house,
    flat,
    receiptDate,
    deductionDate,
    groupName,
  }: CreateStudentDto): Promise<Student> {
    try {
      const person = await this.personalDataService.findPerson(passport);

      if (person) {
        throw new BadRequestException('Такой студент уже есть в базе!');
      }

      const studentPersonalData =
        await this.personalDataService.createPersonalData({
          passport,
          name,
          surname,
          patronymic,
          birthdate,
          isMale,
        });

      const studentContact = await this.contactsService.createContact({
        phone,
        email,
        country,
        city,
        street,
        house,
        flat,
      });

      // TODO: эвэйт считает лишним... ну как скажешь. Видимо тут нет непосредственного обращения к базе, достаточно действий тут. Уточни в документации почему так.
      const newStudent = this.studentRepository.create({
        personalData: { passport: studentPersonalData.passport },
        contact: { phone: studentContact.phone },
        receiptDate,
        deductionDate,
        group: { groupName }, // выбирается на клиенте селектом из уже имеющихся, для данного теста такая группа уже должна быть создана, иначе завернёт обратно
      });

      const saveStudentResponse = await this.studentRepository.save(newStudent);

      return saveStudentResponse;
    } catch (err) {
      console.error(err);
      throw new HttpException(err.message, err.status || 500);
    }
  }

  // TODO: квери параметры -> сортировка, поиск, пагинация (лимит, оффсет), разные фильтры
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
