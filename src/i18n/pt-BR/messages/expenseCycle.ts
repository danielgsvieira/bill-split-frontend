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
    createdAt: 'Data de Criação',
    createdBy: 'Criado por',
    description: 'Descrição',
    endDate: 'Fim',
    id: 'ID',
    sharedWith: 'Compartilhado com',
    startDate: 'Início',
    title: 'Título',
    updatedAt: 'Última Atualização',
  },
  indexPage: {
    pageTitle: 'Ciclos de Despesa',
  },
  viewPage: {
    pageTitle: 'Ciclo de Despesa',
  },
};

export { expenseCycle };
