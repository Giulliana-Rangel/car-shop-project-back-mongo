import { Router } from 'express';
import CarController from '../Controllers/CarController';
import verifyRequiredFields from '../middlewares/verifyRequiredFiels';

const routes = Router();

routes.post(
  '/cars', 
  verifyRequiredFields('cars'),
  (req, res, next) => new CarController(req, res, next).createCarRegister(),
);

routes.get('/cars', (req, res, next) => new CarController(req, res, next).findAllCars());

routes.get('/cars/:id', (req, res, next) => new CarController(req, res, next).findById());

routes.put('/cars/:id', (req, res, next) => new CarController(req, res, next).updateCar());

routes.delete('/cars/:id', (req, res, next) => new CarController(req, res, next).removeCar());

export default routes;