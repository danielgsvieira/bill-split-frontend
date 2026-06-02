import { ExpenseCycleUser } from 'src/models/expense-cycle/ExpenseCycleUser';

type ExpenseCycleUserResponse = {
  id: number;
  username: string;
  displayName: string;
};

function expenseCycleUserResponseToModel(data: ExpenseCycleUserResponse): ExpenseCycleUser;
function expenseCycleUserResponseToModel(data: ExpenseCycleUserResponse[]): ExpenseCycleUser[];
function expenseCycleUserResponseToModel(
  data: ExpenseCycleUserResponse | ExpenseCycleUserResponse[],
): ExpenseCycleUser | ExpenseCycleUser[] {
  if (Array.isArray(data)) {
    return data.map((el) => expenseCycleUserResponseToModel(el));
  }

  return new ExpenseCycleUser(data);
}

export { expenseCycleUserResponseToModel };

export type { ExpenseCycleUserResponse };
