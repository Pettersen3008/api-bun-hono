import type { Context } from "hono";
import ExampleRepository from "../repository/example";

export interface ExampleBasicResponse {
  id: number;
  title: string;
  description: string;
}

export interface ExampleResponse extends ExampleBasicResponse {
  moreDetails?: string;
}

export default class ExampleCoordinator {
  private exampleRepo: ExampleRepository;

  constructor(exampleRepo?: ExampleRepository) {
    this.exampleRepo = exampleRepo || new ExampleRepository();
  }

  async get(context: Context): Promise<ExampleResponse[]> {
    return this.exampleRepo.get(context);
  }

  async getById(context: Context, id: number): Promise<ExampleResponse> {
    const example = await this.exampleRepo.getById(context, id);
    if (!example) {
      throw new Error(`Could not find example with ID ${id}`);
    }
    return example;
  }

  async create(context: Context, model: Pick<ExampleResponse, 'id' | 'title' | 'moreDetails'>): Promise<ExampleResponse> {
    const newId = await this.exampleRepo.create(context, model);
    const example = await this.exampleRepo.getById(context, newId);
    if (!example) throw new Error('Unable to create example');
    return example;
  }

  async update(context: Context, id: number, model: ExampleResponse): Promise<ExampleResponse> {
    await this.exampleRepo.update(context, id, model);
    const example = await this.exampleRepo.getById(context, id);
    if (!example) throw new Error('Unable to update example');
    return example;
  }

  async delete(context: Context, id: number): Promise<boolean> {
    try {
      await this.exampleRepo.delete(context, id);
      return true;
    } catch (err) {
      return false;
    }
  }
}
