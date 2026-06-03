// Enable sort-keys rule to keep things easy to find
/* eslint sort-keys: "error" */

const expenseCycle = {
  createPage: {
    pageTitle: 'Cadastrar Ciclo de Despesa',
  },
  editPage: {
    pageTitle: 'Editar Ciclo de Despesa',
  },
  fieldHints: {
    sharedWith: {
      onlyCreatorCanEdit: 'Somente o criador do ciclo pode editar',
    },
  },
  fields: {
    createdBy: 'Criado por',
    description: 'Descrição',
    endDate: 'Fim',
    sharedWith: 'Compartilhado com',
    startDate: 'Início',
    title: 'Título',
  },
  indexPage: {
    pageTitle: 'Ciclos de Despesa',
  },
  updateUserBudgtsPage: {
    expenseCycleTitle: 'Ciclo de Despesa',
    pageTitle: 'Atualizar Orçamento dos Usuários',
  },
  viewPage: {
    createExpenseBtn: 'Cadastrar Despesa',
    expenseCycleUserBudgetsTitle: 'Orçamento por Usuário',
    expenseListTitle: 'Despesas',
    pageTitle: 'Ciclo de Despesa',
  },
};

export { expenseCycle };
