import {
  dbName,
  dbPassword,
  dbPort,
  dbServiceName,
  dbUsername,
} from './variables';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const dbConnectionConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: dbServiceName,
  port: Number(dbPort),
  username: dbUsername,
  password: dbPassword,
  database: dbName,
  // entities: [Student, Group, Contact, Discipline, Teacher, PersonalData], - вот так нужно будет делать, если autoLoadEntities будет false
  synchronize: true,
  autoLoadEntities: true,
};
