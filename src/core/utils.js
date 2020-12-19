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

export function clearMessages() {
  console.log('Emmitting event ', config.events.CLEAR_MESSAGE);
  window.bus.$emit(config.events.CLEAR_MESSAGE);
}

export function insertMessage(message) {
  console.log('Emmitting event ', config.events.INSERT_MESSAGE);
  if (!message.dontClear) {
    // TODO(19/12/2020): Corrigir o efeito de transação que ficou "flicando"
    clearMessages();
  }
  window.bus.$emit(config.events.INSERT_MESSAGE, message);
}

export function updateObjectInsideArray(array, target) {
  const arrayClone = array;
  const targetIndex = arrayClone.findIndex((object) => object.id === target.id);
  if (targetIndex >= 0) {
    arrayClone[targetIndex] = target;
  }

  return arrayClone;
}
