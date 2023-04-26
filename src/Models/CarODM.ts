import { model, Model, models, Schema } from 'mongoose';
import ICar from '../Interfaces/ICar';

export default class CarODM {
  private _schema: Schema;
  private _model: Model<ICar>;

  constructor() {
    this._schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    }, { versionKey: false });
    this._model = models.Car || model('Car', this._schema);
  }
  public async create(cars: ICar): Promise<ICar> {
    return this._model.create({ ...cars });
  }

  public async find(): Promise<ICar[]> {
    return this._model.find();
  }

  public async findbyId(id: string): Promise<ICar | null> {
    return this._model.findById(id);
  }
}