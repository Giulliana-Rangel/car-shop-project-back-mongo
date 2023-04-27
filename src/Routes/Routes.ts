import { Router } from 'express';
import CarController from '../Controllers/CarController';

const routes = Router();

routes.post('/cars', (req, res) => new CarController(req, res).createCarRegister());

routes.get('/cars', (req, res) => new CarController(req, res).findAllCars());

routes.get('/cars/:id', (req, res) => new CarController(req, res).findById());

routes.put('/cars/:id', (req, res) => new CarController(req, res).updateCar());

routes.delete('/cars/:id', (req, res) => new CarController(req, res).removeCar());

export default routes;