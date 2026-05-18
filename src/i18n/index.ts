import { ptBR } from './pt-BR';

const messages = {
  'pt-BR': ptBR,
};

const numberFormats = {
  'pt-BR': {
    currency: {
      style: 'currency',
      currency: 'BRL',
      notation: 'standard',
    },
    decimalTwoDigits: {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    percent: {
      style: 'percent',
      useGrouping: false,
    },
  },
} as const;

const datetimeFormats = {
  'pt-BR': {
    short: {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    },
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
    },
  },
} as const;

export { datetimeFormats, messages, numberFormats };
