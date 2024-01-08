import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
// import { PersonalData } from 'src/common/personal-data';
import { CreateUpdateInfo } from 'src/common/create-update-info';
import { Group } from 'src/modules/groups/entities/group.entity';

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

  @Column({ type: 'integer', unique: true })
  passport: string;

  // TODO: В идеале так (у педагогов будет повторяться), но пока не так.
  // @Column(() => PersonalData)
  // personalData: PersonalData;

  @Column(() => CreateUpdateInfo)
  changesInfo: CreateUpdateInfo;

  // Разрешит добавить и без указания названия группы (как, и надо ли, исправить это поведение?), но если вбить несуществующую, то будет ругаться.
  @ManyToOne(() => Group, (group) => group.students)
  @JoinColumn({ name: 'group_id' })
  group: Group;

  // контакты - телефон(юник), почта(юник), страна, город, дом, улица, квартира - отдельная таблица со связью 1 к 1
}
