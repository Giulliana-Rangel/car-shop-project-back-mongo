import { Router } from 'express';
import CarController from '../Controllers/CarController';

const routes = Router();

routes.post('/cars', (req, res) => new CarController(req, res).createCarRegister());

export default routes;