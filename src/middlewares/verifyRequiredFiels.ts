import { NextFunction, Request, Response } from 'express';
// import Vehicle from '../Domains/Vehicle';

const vehicleArr = ['model', 'year', 'color', 'buyValue'];

const requestRequiredFields = {
  
  cars: [...vehicleArr, 'doorsQty', 'seatsQty'],
  motorcycles: [...vehicleArr, 'category', 'engineCapacity'],
};

const verifyRequiredFields = (vehicle: keyof typeof requestRequiredFields) => 
  (req: Request, res: Response, next: NextFunction): Response | void => {
    const requiredFields = requestRequiredFields[vehicle];
    for (let i = 0; i < requiredFields.length; i += 1) {
      if (!req.body[requiredFields[i]]) {
        return res.status(400).json({ message: `${requiredFields[i]} is required` });
      }
    }
    next();
  };

export default verifyRequiredFields;