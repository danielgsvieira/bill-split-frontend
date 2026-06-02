import { DateTime } from 'luxon';
import { ExpenseCycleDetails } from 'src/models/expense-cycle/ExpenseCycleDetails';
import {
  type ExpenseCycleExpenseResponse,
  expenseCycleExpenseResponseToModel,
} from './ExpenseCycleExpenseResponse';
import {
  type ExpenseCycleUserResponse,
  expenseCycleUserResponseToModel,
} from './ExpenseCycleUserResponse';

type ExpenseCycleDetailsResponse = {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string | null;
  startDate: string;
  endDate: string;
  createdBy: ExpenseCycleUserResponse;
  sharedWith: ExpenseCycleUserResponse[];
  expenses: ExpenseCycleExpenseResponse[];
};

function expenseCycleDetailsResponseToModel(data: ExpenseCycleDetailsResponse): ExpenseCycleDetails;
function expenseCycleDetailsResponseToModel(
  data: ExpenseCycleDetailsResponse[],
): ExpenseCycleDetails[];
function expenseCycleDetailsResponseToModel(
  data: ExpenseCycleDetailsResponse | ExpenseCycleDetailsResponse[],
): ExpenseCycleDetails | ExpenseCycleDetails[] {
  if (Array.isArray(data)) {
    return data.map((el) => expenseCycleDetailsResponseToModel(el));
  }

  return new ExpenseCycleDetails({
    ...data,
    createdAt: DateTime.fromISO(data.createdAt),
    updatedAt: DateTime.fromISO(data.updatedAt),
    startDate: DateTime.fromISO(data.startDate),
    endDate: DateTime.fromISO(data.endDate),
    createdBy: expenseCycleUserResponseToModel(data.createdBy),
    sharedWith: expenseCycleUserResponseToModel(data.sharedWith),
    expenses: expenseCycleExpenseResponseToModel(data.expenses),
  });
}

export { expenseCycleDetailsResponseToModel };
export type { ExpenseCycleDetailsResponse };
