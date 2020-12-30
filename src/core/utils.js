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
  // TODO(20/12/2020): Atualizar o método de insert message para utilizar este do evento
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

// TODO(29/12/2020): Atualizar os métodos que foram implementados sem utilizar este método
export function isErrorWrapper(error) {
  return error.constructor.name === 'ErrorWrapper';
}
// TODO(29/12/2020): Atualizar os métodos que foram implementados sem utilizar este método
export function getErrorMessage(error) {
  if (isErrorWrapper(error)) {
    return error.getDisplayMessage();
  }

  console.error(error.message);
  return 'Aconteceu algo insperado, contate o administrador do sistema.';
}
