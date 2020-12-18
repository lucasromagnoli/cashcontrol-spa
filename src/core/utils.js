import {
  isBefore, differenceInMinutes, formatDistance, format,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import config from './config';

export function dateIsBefore(dateA, dateB) {
  return isBefore(dateA, dateB);
}

export function dateDifferenceInMinutes(dateA, dateB) {
  return differenceInMinutes(dateA, dateB);
}

export function formatDate(target) {
  const distance = formatDistance(target, new Date(), { locale: ptBR });
  const date = format(target, "MM/dd/yyyy' ás 'HH:mm:ss");
  return `${date} (${distance} atrás)`;
}

export function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function insertMessage(message) {
  console.log('Emmitting event ', config.events.INSERT_MESSAGE);
  window.bus.$emit(config.events.INSERT_MESSAGE, message);
}
