import type { CreateTagRequest } from '../requests';

class CreateTagDto {
  declare readonly __brand: symbol & { __brand: 'CreateTagDto' };

  readonly description: string;

  readonly color: string;

  constructor(data: { description: string; color: string }) {
    this.description = data.description;
    this.color = data.color;
  }

  toRequest(): CreateTagRequest {
    return {
      description: this.description,
      color: this.color,
    };
  }
}

export { CreateTagDto };
