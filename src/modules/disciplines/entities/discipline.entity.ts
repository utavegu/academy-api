import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Teacher } from 'src/modules/teachers/entities/teacher.entity';

@Entity()
export class Discipline {
  // TODO: Названия дисциплин уникальны - можно и без такого ID
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30, unique: true })
  disciplineName: string;

  @Column({ type: 'varchar', nullable: true })
  disciplineDescription: string;

  @ManyToMany(() => Teacher, (teacher) => teacher.disciplines)
  teachers: Teacher[];
}
