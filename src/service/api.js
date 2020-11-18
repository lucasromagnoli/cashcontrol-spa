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
  ORIGIN: '/origin'
}

export function map(...maps) {
  return maps.join('');
}