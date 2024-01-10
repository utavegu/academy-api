import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { Teacher } from 'src/modules/teachers/entities/teacher.entity';

@Entity()
export class Discipline {
  @PrimaryColumn({ type: 'varchar', length: 30, unique: true })
  disciplineName: string;

  @Column({ type: 'varchar', nullable: true })
  disciplineDescription: string;

  @ManyToMany(() => Teacher, (teacher) => teacher.disciplines)
  teachers: Teacher[];
}
