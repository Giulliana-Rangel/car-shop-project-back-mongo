import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

const carNotFound = 'Car not found';
const invalidId = 'Invalid mongo id';

export default class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async createCarRegister() {
    // const car: ICar = {
    //   model: this.req.body.model,
    //   year: this.req.body.year,
    //   color: this.req.body.color,
    //   status: this.req.body.status,
    //   buyValue: this.req.body.buyValue,
    //   doorsQty: this.req.body.doorsQty,
    //   seatsQty: this.req.body.seatsQty,
    // };
    try {
      const newCarRegister = await this.service.createCarRegister(this.req.body);
      return this.res.status(201).json(newCarRegister);
    } catch (error) {
      this.next(error);
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
        return this.res.status(404).json({ message: carNotFound });
      }
      return this.res.status(200).json(byId);
    } catch (error) {
      this.next(error);
      // console.log(error);
      // return this.res.status(422).json({ message: invalidId });
    }
  }

  public async updateCar() {
    try {
      const { id } = this.req.params;
      const car: ICar = { ...this.req.body };
      const update = await this.service.updateById(id, car);
      if (!update) {
        return this.res.status(404).json({ message: carNotFound });
      }
      return this.res.status(200).json(update);
    } catch (error) {
      console.log(error);
      return this.res.status(422).json({ message: invalidId });
    } 
  }

  public async removeCar() {
    try {
      const { id } = this.req.params;
      console.log('controllerCar', id);
      const remove = await this.service.removeById(id);
      if (!remove) {
        return this.res.status(404).json({ message: carNotFound });
      }
      return this.res.status(204).end();
    } catch (error) {
      this.next(error);
    }
  }
}