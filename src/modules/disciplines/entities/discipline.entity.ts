import { Column, Entity, ManyToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { Teacher } from 'src/modules/teachers/entities/teacher.entity';
import { Lecture } from 'src/modules/lectures/entities/lecture.entity';

@Entity()
export class Discipline {
  @PrimaryColumn({ type: 'varchar', length: 30, unique: true })
  disciplineName: string;

  @Column({ type: 'varchar', nullable: true })
  disciplineDescription: string;

  @ManyToMany(() => Teacher, (teacher) => teacher.disciplines)
  teachers: Teacher[];

  @OneToOne(() => Lecture, (lecture) => lecture.discipline)
  lecture: Lecture;
}
