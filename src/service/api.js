import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080'
});

export const api = {
  get(url) {
    return instance.get(url);
  },
  post(url, body) {
    return instance.post(url, body);
  }
}

export const endpoint = {
  SEARCH: '?page=0&size=1000', // TODO: Configurar os datatable para ordenar e filtrar no server side ?
  ORIGIN: '/origin',
  SUBCATEGORY_FILTER: '/subcategory/list?type=',
  INCOME: '/income'
}

export function map(...maps) {
  return maps.join('');
}

export const entities = {
  transactionType: {
    income: 'income',
    expense: 'expense'
  }
}