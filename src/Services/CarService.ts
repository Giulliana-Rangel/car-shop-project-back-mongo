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
}