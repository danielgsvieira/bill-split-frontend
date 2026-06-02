import { ExpenseUser } from 'src/models/expense/ExpenseUser';

type ExpenseUserResponse = {
  id: number;
  username: string;
  displayName: string;
};

function expenseUserResponseToModel(data: ExpenseUserResponse): ExpenseUser;
function expenseUserResponseToModel(data: ExpenseUserResponse[]): ExpenseUser[];
function expenseUserResponseToModel(
  data: ExpenseUserResponse | ExpenseUserResponse[],
): ExpenseUser | ExpenseUser[] {
  if (Array.isArray(data)) {
    return data.map((el) => expenseUserResponseToModel(el));
  }

  return new ExpenseUser(data);
}

export { expenseUserResponseToModel };

export type { ExpenseUserResponse };
