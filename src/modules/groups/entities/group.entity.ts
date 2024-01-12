import { Entity, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { Student } from 'src/modules/students/entities/student.entity';
import { Teacher } from 'src/modules/teachers/entities/teacher.entity';
import { Lecture } from 'src/modules/lectures/entities/lecture.entity';

@Entity()
export class Group {
  @PrimaryColumn({ type: 'varchar', length: 10, unique: true })
  groupName: string;

  @OneToMany(() => Student, (student) => student.group, {
    onDelete: 'NO ACTION',
  })
  students: Student[];

  @OneToOne(() => Teacher, (teacher) => teacher.supervisedGroup)
  curator: Teacher;

  @ManyToOne(() => Lecture, (lecture) => lecture.studentGroups)
  lecture: Lecture;
}
