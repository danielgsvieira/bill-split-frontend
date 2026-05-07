import { ExpenseCycle } from 'src/models/ExpenseCycle';
import { User } from 'src/models/User';
import type { UserResponse } from 'src/services';

type ExpenseCycleResponse = {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string | null;
  startDate: string;
  endDate: string;
  createdBy: UserResponse;
  sharedWith: UserResponse[];
};

function expenseCycleResponseToModel(data: ExpenseCycleResponse): ExpenseCycle;
function expenseCycleResponseToModel(data: ExpenseCycleResponse[]): ExpenseCycle[];
function expenseCycleResponseToModel(
  data: ExpenseCycleResponse | ExpenseCycleResponse[],
): ExpenseCycle | ExpenseCycle[] {
  if (Array.isArray(data)) {
    return data.map((el) => expenseCycleResponseToModel(el));
  }

  const createdAt = new Date(data.createdAt);
  const updatedAt = new Date(data.updatedAt);
  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);
  const createdBy = new User(data.createdBy);
  const sharedWith = data.sharedWith.map((el) => new User(el));

  return new ExpenseCycle({
    ...data,
    createdAt,
    updatedAt,
    startDate,
    endDate,
    createdBy,
    sharedWith,
  });
}

export { expenseCycleResponseToModel };
export type { ExpenseCycleResponse };
