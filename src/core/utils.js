import {
  isBefore, differenceInMinutes, formatDistance, format,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

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
