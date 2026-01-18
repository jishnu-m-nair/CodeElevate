import { Document, Model } from 'mongoose';
import type { FilterQuery, UpdateQuery } from 'mongoose';
import { CustomError } from '../errors/CustomError.js';

export abstract class BaseRepository<T extends Document> {
  constructor(protected model: Model<T>) {}

  async create(data: Partial<T>): Promise<T> {
    const document = new this.model(data);
    return await document.save();
  }

  async findAll(filter: FilterQuery<T> = {}): Promise<T[]> {
    return this.model.find(filter);
  }

  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(filter);
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  async updateOne(filter: FilterQuery<T>, update: UpdateQuery<T>): Promise<T | null> {
    return this.model.findOneAndUpdate(filter, update, { new: true });
  }

  async deleteOne(filter: FilterQuery<T>): Promise<T | null> {
    return this.model.findOneAndDelete(filter);
  }

  protected async updateRaw(filter: FilterQuery<T>, update: UpdateQuery<T>): Promise<boolean> {
    const result = await this.model.updateOne(filter, update);
    return result.matchedCount === 1;
  }

  protected async updateOrFail(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>,
    errorMessage = 'Resource not found',
  ): Promise<void> {
    const result = await this.model.updateOne(filter, update);

    if (result.matchedCount === 0) {
      throw new CustomError(errorMessage, 404);
    }
  }
}
