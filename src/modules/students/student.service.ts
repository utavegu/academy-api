import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { PersonalDataService } from '../personal-data/personal-data.service';
import { ContactsService } from '../contacts/contacts.service';
import { Student } from './entities/student.entity';
import { getStudentSearchingCondition } from '../helpers/getStudentSearchingCondition';
import { getStudentSortingingCondition } from '../helpers/getStudentSortingingCondition';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { IStudentsQueryParams } from './typespaces/IStudentsQueryParams';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly personalDataService: PersonalDataService,
    private readonly contactsService: ContactsService,
  ) {}

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
      throw new HttpException(err.message, err.status || 500);
    }
  }

  async getAllStudents({
    searchField,
    searchString,
    sortBy,
    limit = '10',
    page = '1',
  }: IStudentsQueryParams): Promise<{ data: Student[]; total: number }> {
    try {
      // TODO: Пока с намбером, но после валидации квериПараметров эта необходимость отпадёт. В принципе валидация ТайпОРМ уже не даст туда сунуть не-числовые или отрицательные значения
      const offset = (Number(page) - 1) * Number(limit);
      const findingSettings: FindManyOptions = {
        relations: ['personalData', 'contact', 'group'],
        where: getStudentSearchingCondition(searchField, searchString),
        take: Number(limit),
        skip: offset,
        order: getStudentSortingingCondition(sortBy),
      };

      const [allStudents, total] =
        await this.studentRepository.findAndCount(findingSettings);
      return {
        data: allStudents,
        total,
      };
    } catch (err) {
      throw new HttpException(err.message, err.status || 500);
    }
  }

  async getStudentById(id: Student['id']): Promise<Student> {
    try {
      const targetStudent = await this.studentRepository.findOne({
        where: { id },
        relations: ['personalData', 'contact', 'group'],
      });
      return targetStudent;
    } catch (err) {
      throw new HttpException(err.message, err.status || 500);
    }
  }

  async removeStudentById(id: Student['id']): Promise<void> {
    try {
      await this.studentRepository.delete(id);
      return;
    } catch (err) {
      throw new HttpException(err.message, err.status || 500);
    }
  }

  async updateStudent(
    studentId: Student['id'],
    data: UpdateStudentDto,
  ): Promise<any> {
    try {
      await this.personalDataService.updatePersonalData(data.passport, {
        // passport: data.passport, TODO: наводит на мысль, что автоинкрементный числовой айдишник всё-таки был по делу. Либо надо подумать как ещё обновлять.
        name: data.name,
        surname: data.surname,
        patronymic: data.patronymic,
        birthdate: data.birthdate,
        isMale: data.isMale,
      });
      await this.contactsService.updateContact(data.phone, {
        // phone: data.phone, TODO: наводит на мысль, что автоинкрементный числовой айдишник всё-таки был по делу. Либо надо подумать как ещё обновлять.
        email: data.email,
        country: data.country,
        city: data.city,
        street: data.street,
        house: data.house,
        flat: data.flat,
      });
      const updateStudentResult = await this.studentRepository.update(
        studentId,
        {
          receiptDate: data.receiptDate,
          deductionDate: data.deductionDate,
          group: { groupName: data.groupName },
        },
      );
      if (!updateStudentResult.affected) {
        throw new BadRequestException('Ошибка обновления контакта!');
      }
      return 'Обновление данных произведено успешно!';
    } catch (err) {
      throw new HttpException(err.message, err.status || 500);
    }
  }
}
