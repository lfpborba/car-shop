import { Request, Response, NextFunction } from 'express';
import { IService } from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

class CarController {
  constructor(private _service: IService<ICar>) { }

  public async create(req: Request, res: Response<ICar>, next: NextFunction) {
    try {
      const dataCar = await this._service.create(req.body)
      return res.status(201).json(dataCar);
    } catch (err) {
      next(err);
    }
  }

  public async read(req: Request, res: Response<ICar[]>, next: NextFunction) {
    try {
      const dataCar = await this._service.read()
      return res.status(200).json(dataCar)
    } catch (err) {
      next(err);
    }
  }

  public async readOne(req: Request, res: Response<ICar>, next: NextFunction) {
    try {
      const dataCar = await this._service.readOne(req.params.id);
      return res.status(200).json(dataCar);
    } catch (err) {
      next(err);
    }
  }

  public async update(req: Request, res: Response<ICar>, next: NextFunction) {
    try {
      const dataCar = await this._service.update(req.params.id, req.body);
      return res.status(200).json(dataCar);
    } catch (err) {
      next(err);
    }
  }
}

export default CarController;
