// Enable sort-keys rule to keep things easy to find
/* eslint sort-keys: "error" */

const expenseCycle = {
  createPage: {
    pageTitle: 'Cadastrar Ciclo de Despesa',
  },
  editPage: {
    pageTitle: 'Cadastrar Ciclo de Despesa',
  },
  fieldHints: {
    sharedWith: {
      onlyCreatorCanEdit: 'Somente o criador do ciclo pode editar',
    },
  },
  fields: {
    description: 'Descrição',
    endDate: 'Fim',
    sharedWith: 'Compartilhado com',
    startDate: 'Início',
    title: 'Título',
  },
  indexPage: {
    pageTitle: 'Ciclos de Despesa',
  },
  viewPage: {
    expenseListTitle: 'Despesas',
    pageTitle: 'Ciclo de Despesa',
  },
};

export { expenseCycle };
