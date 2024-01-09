import { Student } from 'src/modules/students/entities/student.entity';
import { Teacher } from 'src/modules/teachers/entities/teacher.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

// TODO: с персонал датой, пожалуй, сделай так же

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 16, unique: true })
  phone: string;

  @Column({ type: 'varchar', length: 256, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 50 })
  country: string;

  @Column({ type: 'varchar', length: 50 })
  city: string;

  @Column({ type: 'varchar', length: 50 })
  street: string;

  @Column({ type: 'smallint' })
  house: number;

  @Column({ type: 'smallint' })
  flat: number;

  @OneToOne(() => Student, (student) => student.contact)
  student: Student;

  @OneToOne(() => Teacher, (teacher) => teacher.contact)
  teacher: Teacher;
}
