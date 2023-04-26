import { isValidObjectId } from 'mongoose';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

export default class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  public async createMotorcycle(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const create = await motorcycleODM.create(motorcycle);
    return this.createMotorcycleDomain(create);
  }

  public async getAllMoto() {
    const motorcycleODM = new MotorcycleODM();
    const getAll = await motorcycleODM.find();
    const arr = getAll.map((moto) => this.createMotorcycleDomain(moto));
    return arr;
  }

  public async getMotoById(id: string) {
    const motorcycleODM = new MotorcycleODM();
    const byId = await motorcycleODM.findbyId(id);
    return this.createMotorcycleDomain(byId);
  }

  public async updateMoto(id: string, motorcycle: IMotorcycle) {
    if (!isValidObjectId(id)) throw new Error('Invalid mongo id');
    const motorcycleODM = new MotorcycleODM();
    const update = await motorcycleODM.update(id, motorcycle);
    return this.createMotorcycleDomain(update);
  }
}