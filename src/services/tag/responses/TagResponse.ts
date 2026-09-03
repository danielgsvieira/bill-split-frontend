import { Tag } from 'src/models/tag/Tag';

type TagResponse = {
  id: number;
  description: string;
  color: string;
};

function tagResponseToModel(data: TagResponse): Tag;
function tagResponseToModel(data: TagResponse[]): Tag[];
function tagResponseToModel(data: TagResponse | TagResponse[]): Tag | Tag[] {
  if (Array.isArray(data)) {
    return data.map((el) => tagResponseToModel(el));
  }

  return new Tag(data);
}

export { tagResponseToModel };
export type { TagResponse };
