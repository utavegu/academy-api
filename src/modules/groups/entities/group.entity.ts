import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Student } from 'src/modules/students/entities/student.entity';

@Entity()
export class Group {
  // TODO: unique - и создавать не создаёт и ошибку сам не выкидывает (вот если длину превышаю - выкидывает - value too long for type character varying(10)). Надо поотлавливать на уровне сервиса. И, скорее всего, придётся сначала делать запрос на наличие такой группы, затем самому выкидывать ошибку.
  @PrimaryColumn({ type: 'varchar', length: 10, unique: true })
  groupName: string;

  @OneToMany(() => Student, (student) => student.group, {
    onDelete: 'NO ACTION',
  })
  students: Student[];
}
