import { Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

export default class CarController {
  private req: Request;
  private res: Response;
  private service: CarService;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
    this.service = new CarService();
  }

  public async createCarRegister() {
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };
    try {
      const newCarRegister = await this.service.createCarRegister(car);
      return this.res.status(201).json(newCarRegister);
    } catch (error) {
      console.log(error);
      return this.res.status(500).json({ message: (error as Error).message });
    }
  }

  public async findAllCars() {
    const allCars = await this.service.findCars();
    return this.res.status(200).json(allCars);
  }

  public async findById() {
    try {
      const { id } = this.req.params;      
      const byId = await this.service.findById(id);
      if (!byId) {
        return this.res.status(404).json({ message: 'Car not found' });
      }
      return this.res.status(200).json(byId);
    } catch (error) {
      console.log(error);
      return this.res.status(422).json({ message: 'Invalid mongo id' });
    }
  }
}