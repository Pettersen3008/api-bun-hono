import type { Context } from "hono";
import TodoRepository from "../repository/todoRepo";

export interface Todo {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
}

export default class TodoCoordinator {
  private todoRepo: TodoRepository;

  constructor(todoRepo?: TodoRepository) {
    this.todoRepo = todoRepo || new TodoRepository();
  }

  async get(context: Context): Promise<Todo[]> {
    return this.todoRepo.get(context);
  }

  async getById(context: Context, id: number): Promise<Todo> {
    const todo = await this.todoRepo.getById(context, id);
    if (!todo) {
      throw new Error(`Could not find todo with ID ${id}`);
    }
    return todo;
  }

  async create(context: Context, model: Pick<Todo, 'id' | 'title' | 'completed'>): Promise<Todo> {
    const newId = await this.todoRepo.create(context, model);
    const todo = await this.todoRepo.getById(context, newId);
    if (!todo) throw new Error('Unable to create todo');
    return todo;
  }

  async update(context: Context, id: number, model: Partial<Todo>): Promise<Todo> {
    const oldModel = await this.todoRepo.getById(context, id);
    if (!oldModel) throw new Error(`Could not find todo with ID ${id}`);

    const updatedModel = { ...oldModel, ...model }
    await this.todoRepo.update(context, id, updatedModel);
    const todo = await this.todoRepo.getById(context, id);
    if (!todo) throw new Error('Unable to update todo');

    return todo;
  }

  async delete(context: Context, id: number): Promise<boolean> {
    try { 
      await this.todoRepo.delete(context, id);
      return true;
    } catch (err) {
      return false;
    }
  }
}
