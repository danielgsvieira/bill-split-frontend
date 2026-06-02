import { httpClient } from 'src/utils';
import type { CreateExpenseCycleDto, EditExpenseCycleDto } from './dto';
import {
  type ExpenseCycleDetailsResponse,
  expenseCycleDetailsResponseToModel,
  type ExpenseCycleListItemResponse,
  expenseCycleListItemResponseToModel,
  type ExpenseCycleUserResponse,
  expenseCycleUserResponseToModel,
} from './responses';

class ExpenseCycleService {
  declare readonly __brand: symbol & { __brand: 'ExpenseCycleService' };

  readonly basePath = 'expense-cycle';

  async list() {
    const response = await httpClient.get<ExpenseCycleListItemResponse[]>(this.basePath);

    return expenseCycleListItemResponseToModel(response);
  }

  create(dto: CreateExpenseCycleDto) {
    return httpClient.post<{ id: number }>(this.basePath, dto.toRequest());
  }

  async findOneById(id: number) {
    const response = await httpClient.get<ExpenseCycleDetailsResponse>(`${this.basePath}/${id}`);

    return expenseCycleDetailsResponseToModel(response);
  }

  edit(dto: EditExpenseCycleDto) {
    return httpClient.put<{ id: number }>(`${this.basePath}/${dto.id}`, dto.toRequest());
  }

  async delete(id: number) {
    return httpClient.delete<{ id: number }>(`${this.basePath}/${id}`);
  }

  async listUsers(id: number) {
    const response = await httpClient.get<ExpenseCycleUserResponse[]>(
      `${this.basePath}/${id}/list-user`,
    );

    return expenseCycleUserResponseToModel(response);
  }
}

const expenseCycleService = new ExpenseCycleService();

export { expenseCycleService };
