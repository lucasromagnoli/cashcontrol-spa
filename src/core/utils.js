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

export function emitEvent(event, payload) {
  console.log('Emitting event', event);
  window.bus.$emit(event, payload);
}

export function clearMessages() {
  emitEvent(config.events.CLEAR_MESSAGE);
}

export function insertMessage(message) {
  if (!message.dontClear) {
    // TODO(19/12/2020): Corrigir o efeito de transação que ficou "flicando"
    clearMessages();
  }
  emitEvent(config.events.INSERT_MESSAGE, message);
}

export function updateObjectInsideArray(array, target) {
  const arrayClone = array;
  const targetIndex = arrayClone.findIndex((object) => object.id === target.id);
  if (targetIndex >= 0) {
    arrayClone[targetIndex] = target;
  }

  return arrayClone;
}

export function nvl(target1, target2) {
  if (target1) {
    return target1;
  }

  return target2;
}

export function isErrorWrapper(error) {
  return error.constructor.name === 'ErrorWrapper';
}

export function getErrorMessage(error) {
  if (isErrorWrapper(error)) {
    return error.getDisplayMessage();
  }

  console.error(error.message);
  return 'Aconteceu algo insperado, contate o administrador do sistema.';
}

export function isEmptyArray(array) {
  return !Array.isArray(array) || array.length === 0;
}

export function isString(string) {
  return typeof string === 'string';
}

export function equalsIgnoreCase(string1, string2) {
  if (!isString(string1) || !isString(string2)) {
    return false;
  }

  return string1.toUpperCase() === string2.toUpperCase();
}

export function storeIsToUpdate(forceUpdate, lastUpdate, expireMinutes, dataTable = []) {
  const diffInMinus = dateDifferenceInMinutes(new Date(), lastUpdate);
  const dataTableIsEmpty = isEmptyArray(dataTable);
  const updateExpires = Number.isNaN(diffInMinus) || diffInMinus >= expireMinutes;

  console.log(`dataTableIsEmpty: ${dataTableIsEmpty} - updateExpires: ${updateExpires}`);
  return forceUpdate || dataTableIsEmpty || updateExpires;
}
