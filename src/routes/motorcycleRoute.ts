import { Router } from 'express';
import MotorcycleController from '../controllers/motorcycleController';
import MotorcycleService from '../services/motorcycleServices';
import MotorcycleModel from '../models/motorcycleModel';

const motorcycleRoute = Router();

const motorcycleModel = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycleModel);
const motorcycleController = new MotorcycleController(motorcycleService);

const motorcycles = 'motorcycles';

motorcycleRoute.post(`/${motorcycles}`, (req, res, next) => {
  motorcycleController.create(req, res, next);
});
motorcycleRoute.get(`/${motorcycles}`, (req, res, next) => {
  motorcycleController.read(req, res, next);
});
motorcycleRoute.get(`/${motorcycles}/:id`, (req, res, next) => {
  motorcycleController.readOne(req, res, next);
});
motorcycleRoute.put(`/${motorcycles}/:id`, (req, res, next) => {
  motorcycleController.update(req, res, next);
});
motorcycleRoute.delete(`/${motorcycles}/:id`, (req, res, next) => {
  motorcycleController.delete(req, res, next);
});

export default motorcycleRoute;