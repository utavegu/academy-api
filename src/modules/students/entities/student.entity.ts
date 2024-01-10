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

  @Column({ type: 'date' })
  receiptDate: Date;

  @Column({ type: 'date', nullable: true })
  deductionDate: Date;

  @Column(() => CreateUpdateInfo)
  changesInfo: CreateUpdateInfo;

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
