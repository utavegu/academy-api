import { Column } from 'typeorm';

export class PersonalData {
  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 30 })
  surname: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  patronymic: string;

  @Column({ type: 'date' })
  birthdate: Date;
}
