import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CreateUpdateInfo {
  @CreateDateColumn({ select: false })
  createdDate: Date;

  @UpdateDateColumn({ select: false })
  updatedDate: Date;
}
