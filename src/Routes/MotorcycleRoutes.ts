import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const routes = Router();

routes.post(
  '/motorcycles', 
  (req, res, next) => new MotorcycleController(req, res, next).createMotorcycle(),
);

routes.get(
  '/motorcycles', 
  (req, res, next) => new MotorcycleController(req, res, next).getAllMotos(),
);

routes.get(
  '/motorcycles/:id', 
  (req, res, next) => new MotorcycleController(req, res, next).getMotoById(),
);

routes.put(
  '/motorcycles/:id', 
  (req, res, next) => new MotorcycleController(req, res, next).updateMotoById(),
);

export default routes;
