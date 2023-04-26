import { Schema, model, Model, models } from 'mongoose';

abstract class AbstractODM<T> {
  protected model: Model<T>;
  private schema: Schema<T>;

  constructor(schema:Schema<T>, modelName:string) {
    this.schema = schema;
    this.model = models[modelName] || model(modelName, this.schema);
  }

  public async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  public async find(): Promise<T[]> {
    return this.model.find();
  }

  public async findbyId(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  public async update(id: string, obj: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(
      { _id: id },
      { ...obj },
      { new: true },
    );
  }
}
export default AbstractODM;