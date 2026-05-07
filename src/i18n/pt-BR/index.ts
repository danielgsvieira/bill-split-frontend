// Enable sort-keys rule to keep things easy to find
/* eslint sort-keys: "error" */

import { apiError } from './messages/apiError';
import { auth } from './messages/auth';
import { expenseCycle } from './messages/expenseCycle';
import { general } from './messages/general';
import { pageNotFound } from './messages/pageNotFound';
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
