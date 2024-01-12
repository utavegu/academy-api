import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Workday } from '../typespaces/enums/workdays.enum';
import { Teacher } from 'src/modules/teachers/entities/teacher.entity';
import { Discipline } from 'src/modules/disciplines/entities/discipline.entity';
import { Group } from 'src/modules/groups/entities/group.entity';
import { Auditorium } from 'src/modules/auditoriums/entities/auditorium.entity';

@Entity()
export class Lecture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'time' })
  timeStart: Date;

  @Column({ type: 'time' })
  timeEnd: Date;

  @Column({ type: 'enum', enum: Workday })
  weekday: Workday;

  @OneToOne(() => Teacher, (teacher) => teacher.lecture)
  @JoinColumn()
  lector: Teacher;

  @OneToOne(() => Discipline, (discipline) => discipline.lecture)
  @JoinColumn()
  discipline: Discipline;

  @OneToOne(() => Auditorium, (auditorium) => auditorium.lecture)
  @JoinColumn()
  auditorium: Auditorium;

  @OneToMany(() => Group, (group) => group.lecture)
  @JoinColumn()
  studentGroups: Group[];
}
