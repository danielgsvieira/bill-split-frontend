// Enable sort-keys rule to keep things easy to find
/* eslint sort-keys: "error" */

import { createPage } from './create/expenseCycleCreatePage.i18n';
import { editPage } from './edit/expenseCycleEditPage.i18n';
import { indexPage } from './index/expenseCycleIndexPage.i18n';
import { viewPage } from './view/expenseCycleViewPage.i18n';

const expenseCycle = {
  createPage,
  editPage,
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
  indexPage,
  viewPage,
};

export { expenseCycle };
