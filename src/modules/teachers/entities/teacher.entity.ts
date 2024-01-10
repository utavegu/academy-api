import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Contact } from 'src/modules/contacts/entities/contact.entity';
import { Discipline } from 'src/modules/disciplines/entities/discipline.entity';
import { Group } from 'src/modules/groups/entities/group.entity';
import { PersonalData } from 'src/modules/personal-data/entities/personal-data.entity';
import { TeacherRole } from '../typespaces/enums/teacher-role.enum';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true })
  login: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  password: string;

  @Column({ type: 'enum', enum: TeacherRole, default: [TeacherRole.TEACHER] })
  roles: TeacherRole[];

  @Column({ type: 'date' })
  employmentDate: Date;

  @Column({ type: 'date', nullable: true })
  dismissalDate: Date;

  @Column({ type: 'boolean', default: false })
  isCurator: boolean;

  @OneToOne(() => Group, (group) => group.curator)
  @JoinColumn()
  supervisedGroup: Group;

  @OneToOne(() => Contact, (contact) => contact.teacher)
  @JoinColumn()
  contact: Contact;

  @ManyToMany(() => Discipline, (discipline) => discipline.teachers)
  @JoinTable()
  disciplines: Discipline[];

  @OneToOne(() => PersonalData, (personalData) => personalData.teacher)
  @JoinColumn()
  personalData: PersonalData;
}
