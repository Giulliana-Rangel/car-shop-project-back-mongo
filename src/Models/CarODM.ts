import { Schema } from 'mongoose';
import ICar from '../Interfaces/ICar';
import AbstractODM from './AbstractODM';

export default class CarODM extends AbstractODM<ICar> {
  constructor() {
    const schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    }, { versionKey: false });

    super(schema, 'Car');
  }
  // public async create(cars: ICar): Promise<ICar> {
  //   return this._model.create({ ...cars });
  // }

  // public async find(): Promise<ICar[]> {
  //   return this._model.find();
  // }

  // public async findbyId(id: string): Promise<ICar | null> {
  //   return this._model.findById(id);
  // }

  // public async update(id: string, car: Partial<ICar>): Promise<ICar | null> {
  //   return this._model.findByIdAndUpdate(
  //     { _id: id },
  //     { ...car },
  //     { new: true },
  //   );
  // }
}