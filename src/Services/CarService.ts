import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

export default class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async createCarRegister(car: ICar) {
    const carODM = new CarODM();
    const carRegister = await carODM.create(car);
    return this.createCarDomain(carRegister);
  }

  public async findCars() {
    const carODM = new CarODM();
    const allCars = await carODM.find(); 
    const carArr = allCars.map((car) => this.createCarDomain(car));
    return carArr;
    // return allCars;
  }

  public async findById(id: string) {
    if (!isValidObjectId(id)) throw new Error('Invalid mongo id');
    const carODM = new CarODM();
    const byId = await carODM.findbyId(id);
    return this.createCarDomain(byId);
  }
  public async updateById(id: string, car: ICar) {
    if (!isValidObjectId(id)) throw new Error('Invalid mongo id');
    const carODM = new CarODM();
    const update = await carODM.update(id, car);
    return this.createCarDomain(update);
  }
}