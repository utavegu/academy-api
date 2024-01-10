import { Poll } from 'src/modules/test/entities/poll.entity';
import {
  dbName,
  dbPassword,
  dbPort,
  dbServiceName,
  dbUsername,
} from './variables';
import { Student } from 'src/modules/students/entities/student.entity';
import { Group } from 'src/modules/groups/entities/group.entity';
import { Contact } from 'src/modules/contacts/entities/contact.entity';
import { Discipline } from 'src/modules/disciplines/entities/discipline.entity';
import { Teacher } from 'src/modules/teachers/entities/teacher.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PersonalData } from 'src/modules/personal-data/entities/personal-data.entity';

export const dbConnectionConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: dbServiceName,
  port: Number(dbPort), // TODO: Ну вот чтобы такой порнухи не было, лучше конечно нестовый конфиг с типизацией и геттерами
  username: dbUsername,
  password: dbPassword,
  database: dbName,
  entities: [Poll, Student, Group, Contact, Discipline, Teacher, PersonalData],
  synchronize: true,
};
