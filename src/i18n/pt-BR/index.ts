// Enable sort-keys rule to keep things easy to find
/* eslint sort-keys: "error" */

import { apiError } from './messages/apiError';
import { auth } from 'src/pages/auth/auth.i18n';
import { expenseCycle } from '../../pages/expense-cycle/expenseCycle.i18n';
import { general } from './messages/general';
import { pageNotFound } from 'src/pages/page-not-found/pageNotFound.i18n';
import { validation } from './messages/validation';

const ptBR = {
  apiError,
  auth,
  expenseCycle,
  general,
  pageNotFound,
  validation,
};

export { ptBR };
