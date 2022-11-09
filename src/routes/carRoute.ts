import { Router } from 'express';
import CarController from '../controllers/carController';
import CarService from '../services/carServices'
import Car from '../models/carModel';

const carRoute = Router();

const carModel = new Car()
const carService = new CarService(carModel);
const carController = new CarController(carService);

carRoute.post('/cars', (req, res, next) => carController.create(req, res, next))

export default carRoute;