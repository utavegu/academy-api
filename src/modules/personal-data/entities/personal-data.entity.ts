import { Student } from 'src/modules/students/entities/student.entity';
import { Teacher } from 'src/modules/teachers/entities/teacher.entity';
import { Column, OneToOne, PrimaryColumn } from 'typeorm';

export class PersonalData {
  // TODO: По идее праймари ключом можно сделать паспорт, так как он уникален
  @PrimaryColumn({ type: 'integer', unique: true })
  passport: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 30 })
  surname: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  patronymic: string;

  @Column({ type: 'date' })
  birthdate: Date;

  @Column({ type: 'boolean', nullable: true })
  isMale: boolean;

  @OneToOne(() => Student, (student) => student.personalData)
  student: Student;

  @OneToOne(() => Teacher, (teacher) => teacher.personalData)
  teacher: Teacher;
}
