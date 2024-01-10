import { Student } from 'src/modules/students/entities/student.entity';
import { Teacher } from 'src/modules/teachers/entities/teacher.entity';
import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class PersonalData {
  // TODO: Почему стал говорить, что интеджер не вмещает по длине? Норм же было. Потестируй ещё через ручку создания персонал даты, не создания студента
  @PrimaryColumn({ type: 'bigint', unique: true })
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
