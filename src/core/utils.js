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
  this.emitEvent(config.events.CLEAR_MESSAGE);
}

export function insertMessage(message) {
  if (!message.dontClear) {
    // TODO(19/12/2020): Corrigir o efeito de transação que ficou "flicando"
    clearMessages();
  }
  this.emitEvent(config.events.INSERT_MESSAGE);
}

export function emitEvent(event, payload) {
  // TODO(20/12/2020): Atualizar o método de insert message para utilizar este do evento
  console.log('Emitting event', event);
  window.bus.$emit(event, payload);
}

export function updateObjectInsideArray(array, target) {
  const arrayClone = array;
  const targetIndex = arrayClone.findIndex((object) => object.id === target.id);
  if (targetIndex >= 0) {
    arrayClone[targetIndex] = target;
  }

  return arrayClone;
}
