import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { Lecture } from 'src/modules/lectures/entities/lecture.entity';

@Entity()
export class Auditorium {
  @PrimaryColumn({ type: 'smallint', unique: true })
  auditoriumNumber: number;

  @Column({ type: 'varchar' })
  auditoriumDescription: string;

  @OneToOne(() => Lecture, (lecture) => lecture.auditorium)
  lecture: Lecture;
}
