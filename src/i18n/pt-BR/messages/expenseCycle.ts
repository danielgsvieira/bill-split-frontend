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
  fieldValidations: {
    requiredUserRelatedToExpenses:
      'O usuário {user} é obrigatório pois existem despesas vinculadas à ele',
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
    allBudgetsMustBeFilledHint: 'Preencha todos os orçamentos',
    createExpenseBtn: 'Cadastrar Despesa',
    expenseCycleBalanceTitle: 'Resultados',
    expenseCycleUserBudgetsTitle: 'Orçamento por Usuário',
    expenseListTitle: 'Despesas',
    fillUserBudgetsToViewHint: 'Preencha todos os orçamentos para visualizar',
    pageTitle: 'Ciclo de Despesa',
    valuesSection: {
      balance: 'Saldo',
      debtPaymentSuggestion: 'Sugestão de pagamentos',
      paymentRecomendationText: '{payingUser} paga {value} para {receivingUser}',
      totalExpended: 'Gasto total',
    },
  },
};

export { expenseCycle };
