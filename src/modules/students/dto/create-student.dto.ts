// TODO: класс-валидатор

export class CreateStudentDto {
  passport: number;
  name: string;
  surname: string;
  patronymic?: string;
  birthdate: Date;
  isMale?: boolean;
  phone: string;
  email: string;
  country: string;
  city: string;
  street: string;
  house: number;
  flat: number;
  receiptDate: Date;
  deductionDate?: Date | null;
  groupName: string;
}
