import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const motoById = '/motorcycles/:id';

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
  motoById, 
  (req, res, next) => new MotorcycleController(req, res, next).getMotoById(),
);

routes.put(
  motoById, 
  (req, res, next) => new MotorcycleController(req, res, next).updateMotoById(),
);

routes.delete(
  motoById, 
  (req, res, next) => new MotorcycleController(req, res, next).removeMoto(),
);

export default routes;
