import { httpClient } from 'src/utils';
import type { CreateExpenseCycleDto, EditExpenseCycleDto } from './dto';
import { type ExpenseCycleResponse, expenseCycleResponseToModel } from './responses';

class ExpenseCycleService {
  readonly basePath = 'expense-cycle';

  async list() {
    const response = await httpClient.get<ExpenseCycleResponse[]>(this.basePath);

    return expenseCycleResponseToModel(response);
  }

  async create(dto: CreateExpenseCycleDto) {
    const response = await httpClient.post<ExpenseCycleResponse>(this.basePath, dto.toRequest());

    return expenseCycleResponseToModel(response);
  }

  async findOneById(id: number) {
    const response = await httpClient.get<ExpenseCycleResponse>(`${this.basePath}/${id}`);

    return expenseCycleResponseToModel(response);
  }

  async edit(dto: EditExpenseCycleDto) {
    const response = await httpClient.put<ExpenseCycleResponse>(
      `${this.basePath}/${dto.id}`,
      dto.toRequest(),
    );

    return expenseCycleResponseToModel(response);
  }
}

const expenseCycleService = new ExpenseCycleService();

export { expenseCycleService };
