// Enable sort-keys rule to keep things easy to find
/* eslint sort-keys: "error" */

const validation = {
  alreadyExists: {
    long: 'Campo {fieldName} deve ser único',
    short: '{fieldName} já utilizado',
  },
  defaultMessage: {
    long: 'Campo {fieldName}: Regra de validação desconhecida',
    short: 'Validação desconhecida',
  },
  invalidFormData: 'Dados inválidos, por favor verifique os campos preenchidos.',
  length: {
    long: 'O campo {fieldName} deve conter de {min} a {max} caracteres',
    short: '{min} a {max} caracteres',
  },
  maxDate: {
    long: 'O campo {fieldName} deve ser anterior à {max}',
    short: 'Deve ser anterior à {max}',
  },
  maxLength: {
    long: 'O campo {fieldName} deve onter no máximo {max} caracteres',
    short: 'Max. {max} caracteres',
  },
  maxNumber: {
    long: 'O campo {fieldName} deve ser menor que {max}',
    short: 'Deve ser menor que {max}',
  },
  minDate: {
    long: 'O campo {fieldName} deve ser posterior à {min}',
    short: 'Deve ser posterior à {min}',
  },
  minLength: {
    long: 'O campo {fieldName} deve conter no mínimo de {min} caracteres',
    short: 'Min. {min} caracteres',
  },
  minNumber: {
    long: 'O campo {fieldName} deve ser maior que {min}',
    short: 'Deve ser maior que {min}',
  },
  required: {
    long: 'O campo {fieldName} é obrigatório',
    short: 'Obrigatório',
  },
};

export { validation };
