import { ILike } from 'typeorm';
import { IStudentsQueryParams } from '../modules/students/typespaces/IStudentsQueryParams';

export const getStudentSearchingCondition = (
  targetField: IStudentsQueryParams['searchField'],
  findedString: IStudentsQueryParams['searchString'],
) => {
  switch (targetField) {
    case 'name':
      return {
        personalData: {
          name: ILike('%' + findedString + '%'),
        },
      };
    case 'surname':
      return {
        personalData: {
          surname: ILike('%' + findedString + '%'),
        },
      };
    case 'country':
      return {
        contact: {
          country: ILike('%' + findedString + '%'),
        },
      };
    case 'city':
      return {
        contact: {
          city: ILike('%' + findedString + '%'),
        },
      };
    case 'groupName':
      return {
        group: {
          groupName: ILike('%' + findedString + '%'),
        },
      };
    case 'receiptDate':
      return {
        receiptDate: ILike('%' + findedString + '%'),
      };
    default:
      return {
        personalData: {
          name: ILike('%' + '' + '%'), // TODO: Вообще выглядит как костыль, но работает как надо, потому пока оставлю так
        },
      };
  }
};
