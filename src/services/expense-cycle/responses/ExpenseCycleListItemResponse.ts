import { DateTime } from 'luxon';
import { ExpenseCycleListItem } from 'src/models/expense-cycle/ExpenseCycleListItem';
import {
  type ExpenseCycleUserResponse,
  expenseCycleUserResponseToModel,
} from './ExpenseCycleUserResponse';

type ExpenseCycleListItemResponse = {
  id: number;
  title: string;
  description: string | null;
  startDate: string;
  endDate: string;
  createdBy: ExpenseCycleUserResponse;
};

function expenseCycleListItemResponseToModel(
  data: ExpenseCycleListItemResponse,
): ExpenseCycleListItem;
function expenseCycleListItemResponseToModel(
  data: ExpenseCycleListItemResponse[],
): ExpenseCycleListItem[];
function expenseCycleListItemResponseToModel(
  data: ExpenseCycleListItemResponse | ExpenseCycleListItemResponse[],
): ExpenseCycleListItem | ExpenseCycleListItem[] {
  if (Array.isArray(data)) {
    return data.map((el) => expenseCycleListItemResponseToModel(el));
  }

  return new ExpenseCycleListItem({
    ...data,
    startDate: DateTime.fromISO(data.startDate),
    endDate: DateTime.fromISO(data.endDate),
    createdBy: expenseCycleUserResponseToModel(data.createdBy),
  });
}

export { expenseCycleListItemResponseToModel };

export type { ExpenseCycleListItemResponse };
