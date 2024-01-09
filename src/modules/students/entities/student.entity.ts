import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
// import { PersonalData } from 'src/common/personal-data';
import { CreateUpdateInfo } from 'src/common/create-update-info';
import { Group } from 'src/modules/groups/entities/group.entity';
import { Contact } from 'src/modules/contacts/entities/contact.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 30 })
  surname: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  patronymic: string;

  @Column({ type: 'boolean', nullable: true })
  isMale: boolean;

  @Column({ type: 'integer', unique: true })
  passport: number;

  // TODO: В идеале так (у педагогов будет повторяться), но пока не так. Либо тоже связью 1 к 1. Подумаю ещё как лучше.
  // @Column(() => PersonalData)
  // personalData: PersonalData;

  @Column(() => CreateUpdateInfo)
  changesInfo: CreateUpdateInfo;

  // Разрешит добавить и без указания названия группы (как, и надо ли, исправить это поведение?), но если вбить несуществующую, то будет ругаться.
  @ManyToOne(() => Group, (group) => group.students)
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @OneToOne(() => Contact, (contact) => contact.student)
  @JoinColumn()
  contact: Contact;
}
