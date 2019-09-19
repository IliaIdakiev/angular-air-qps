import { IQueryData } from '../interfaces';
import { multiValueParser } from './mult-value-parser';

// INFO:
// Since the API that we will be using has a specific way of filtering/sorting/paginating the results
// we will use the apiQueryBuilder to transform the values from the QueryParamsStore into the ones
// that our API recognizes

const queryParamMap = {
  page: (value: number) => `_page=${value}`,
  pageSize: (value: number) => `_limit=${value}`,
  sort: (value: string | string[]) => {
    const values = typeof value === 'string' ? value.split(',') : value;
    const resultObject = multiValueParser(values);
    return resultObject.keys.length > 0 && resultObject.vals.length > 0 ?
      `_sort=${resultObject.keys.join()}&_order=${resultObject.vals.join()}` : ``;
  },
  filter: (value: string) => {
    const values = typeof value === 'string' ? value.split(',') : value;
    if (values.length === 1 && values[0].length === 1) { return `q=${value}`; }
    const resultObject = multiValueParser(values);
    return resultObject.keys.length > 0 && resultObject.vals.length > 0 ? resultObject.keys.map(
      (key, index) => `${key}_like=${resultObject.vals[index]}`).join('&')
      : ``;
  },
  userId: (value: string) => `userId=${value}`,
};

export function apiQueryBuilder(data: IQueryData) {
  return Object.keys(data).reduce((acc, key, index, collection) => {
    const currentValue = data[key];
    if (!currentValue) { return acc; }
    if (acc === '') {
      acc = '?';
    } else if (acc[acc.length - 1] && index + 1 !== collection.length) {
      acc += '&';
    }
    return acc += queryParamMap[key](data[key]);
  }, '');
}
