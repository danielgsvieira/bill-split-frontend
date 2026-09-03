import type { CreateTagDto } from './dto';
import { httpClient } from 'src/utils';
import {
  type IsTagDescriptionAvailableResponse,
  type TagResponse,
  tagResponseToModel,
} from './responses';

class TagService {
  declare readonly __brand: symbol & { __brand: 'TagService' };

  readonly basePath = 'tag';

  async list() {
    const response = await httpClient.get<TagResponse[]>(this.basePath);

    return tagResponseToModel(response);
  }

  create(dto: CreateTagDto) {
    return httpClient.post<{ id: number }>(this.basePath, dto.toRequest());
  }

  isDescriptionAvailable(description: string) {
    return httpClient.post<IsTagDescriptionAvailableResponse>(
      `${this.basePath}/is-description-available`,
      { description },
    );
  }
}

const tagService = new TagService();

export { tagService };
