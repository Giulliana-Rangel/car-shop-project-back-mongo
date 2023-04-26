import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

export default class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }
  public async createMotorcycle() {
    const motorcycle: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };
    try {
      const motoRegister = await this.service.createMotorcycle(motorcycle);
      return this.res.status(201).json(motoRegister);
    } catch (error) {
      this.next(error);
      // console.log(error);
      // return this.res.status(500).json({ message: (error as Error).message });
    }
  }
  public async getAllMotos() {
    const allMotos = await this.service.getAllMoto();
    return this.res.status(200).json(allMotos);
  }

  public async getMotoById() {
    try {
      const { id } = this.req.params;
      const byId = await this.service.getMotoById(id);
      if (!byId) {
        return this.res.status(404).json({ message: 'Motorcycle not found' });
      }
      return this.res.status(200).json(byId);
    } catch (error) {
      console.log(error);
      return this.res.status(422).json({ message: 'Invalid mongo id' });
    }
  }
  public async updateMotoById() {
    try {
      const { id } = this.req.params;
      const motorcycle: IMotorcycle = { ...this.req.body };
      const update = await this.service.updateMoto(id, motorcycle);
      if (!update) {
        return this.res.status(404).json({ message: 'Motorcycle not found' });
      }
      return this.res.status(200).json(update);
    } catch (error) {
      console.log(error);
      return this.res.status(422).json({ message: 'Invalid mongo id' });
    } 
  }
}