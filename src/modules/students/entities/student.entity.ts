import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { CreateUpdateInfo } from 'src/common/create-update-info';
import { Group } from 'src/modules/groups/entities/group.entity';
import { Contact } from 'src/modules/contacts/entities/contact.entity';
import { PersonalData } from 'src/modules/personal-data/entities/personal-data.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column(() => CreateUpdateInfo)
  changesInfo: CreateUpdateInfo;

  @Column({ type: 'date' })
  receiptDate: Date;

  @Column({ type: 'date', nullable: true })
  deductionDate: Date;

  // TODO: Разрешит добавить и без указания названия группы (как, и надо ли, исправить это поведение?), но если вбить несуществующую, то будет ругаться.
  @ManyToOne(() => Group, (group) => group.students)
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @OneToOne(() => Contact, (contact) => contact.student)
  @JoinColumn()
  contact: Contact;

  @OneToOne(() => PersonalData, (personalData) => personalData.student)
  @JoinColumn()
  personalData: PersonalData;
}
