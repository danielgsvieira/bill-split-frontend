import { ExpenseTag } from 'src/models/expense/ExpenseTag';

type ExpenseTagResponse = {
  id: number;
  description: string;
  color: string;
};

function expenseTagResponseToModel(data: ExpenseTagResponse): ExpenseTag;
function expenseTagResponseToModel(data: ExpenseTagResponse[]): ExpenseTag[];
function expenseTagResponseToModel(
  data: ExpenseTagResponse | ExpenseTagResponse[],
): ExpenseTag | ExpenseTag[] {
  if (Array.isArray(data)) {
    return data.map((el) => expenseTagResponseToModel(el));
  }

  return new ExpenseTag(data);
}

export { expenseTagResponseToModel };

export type { ExpenseTagResponse };
