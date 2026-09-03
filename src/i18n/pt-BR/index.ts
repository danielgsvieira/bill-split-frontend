// Enable sort-keys rule to keep things easy to find
/* eslint sort-keys: "error" */

import { apiError } from './messages/apiError';
import { auth } from './messages/auth';
import { expense } from './messages/expense';
import { expenseCycle } from './messages/expenseCycle';
import { general } from './messages/general';
import { pageNotFound } from './messages/pageNotFound';
import { tag } from './messages/tag';
import { validation } from './messages/validation';

const ptBR = {
  apiError,
  auth,
  expense,
  expenseCycle,
  general,
  pageNotFound,
  tag,
  validation,
};

export { ptBR };
