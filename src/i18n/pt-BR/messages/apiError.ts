// Enable sort-keys rule to keep things easy to find
/* eslint sort-keys: "error" */

const apiError = {
  forbiddenAction: 'Você não possui permissao para realizar esta ação.',
  notFound: 'Dado não encontrado.',
  unauthorized: 'Você precisa estar autenticado para realizar esta ação.',
  unknownError: 'Ocorreu um erro inesperado na aplicação.',
  validationFailed: 'Erro de validação. Verifique as informações preenchidas.',
};

export { apiError };
