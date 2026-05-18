import { httpClient } from 'src/utils';
import type { CreateExpenseDto, EditExpenseDto } from './dto';
import { type ExpenseResponse, expenseResponseToModel } from './responses';

class ExpenseService {
  readonly basePath = 'expense';

  async listByExpenseCycleId(expenseCycleId: number) {
    const response = await httpClient.get<ExpenseResponse[]>(
      `${this.basePath}/find-by-expense-cycle-id/${expenseCycleId}`,
    );

    return expenseResponseToModel(response);
  }

  async create(dto: CreateExpenseDto) {
    const response = await httpClient.post<ExpenseResponse>(this.basePath, dto.toRequest());

    return expenseResponseToModel(response);
  }

  async edit(dto: EditExpenseDto) {
    const response = await httpClient.put<ExpenseResponse>(
      `${this.basePath}/${dto.id}`,
      dto.toRequest(),
    );

    return expenseResponseToModel(response);
  }

  async delete(id: number) {
    const response = await httpClient.delete<ExpenseResponse>(`${this.basePath}/${id}`);

    return expenseResponseToModel(response);
  }
}

const expenseService = new ExpenseService();

export { expenseService };
