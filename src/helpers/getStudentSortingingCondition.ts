import { IStudentsQueryParams } from '../modules/students/typespaces/IStudentsQueryParams';

export const getStudentSortingingCondition = (
  sortingCondition: IStudentsQueryParams['sortBy'],
) => {
  switch (sortingCondition) {
    case 'nameAsc':
      return {
        personalData: {
          name: 'ASC',
        },
      };
    case 'nameDesc':
      return {
        personalData: {
          name: 'DESC',
        },
      };
    case 'surnameAsc':
      return {
        personalData: {
          surname: 'ASC',
        },
      };
    case 'surnameDesc':
      return {
        personalData: {
          surname: 'DESC',
        },
      };
    case 'birthdateAsc':
      return {
        personalData: {
          birthdate: 'ASC',
        },
      };
    case 'birthdateDesc':
      return {
        personalData: {
          birthdate: 'DESC',
        },
      };
    case 'countryAsc':
      return {
        contact: {
          country: 'ASC',
        },
      };
    case 'countryDesc':
      return {
        contact: {
          country: 'DESC',
        },
      };
    case 'cityAsc':
      return {
        contact: {
          city: 'ASC',
        },
      };
    case 'cityDesc':
      return {
        contact: {
          city: 'DESC',
        },
      };
    case 'receiptDateAsc':
      return {
        receiptDate: 'ASC',
      };
    case 'receiptDateDesc':
      return {
        receiptDate: 'DESC',
      };
    default:
      return {
        id: 'ASC',
      };
  }
};
