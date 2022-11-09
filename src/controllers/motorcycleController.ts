import { Request, Response, NextFunction } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

class MotocycleController {
  constructor(private _service: IService<IMotorcycle>) {}

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const created = await this._service.create(req.body);
      return res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  }

  public async read(req: Request, res: Response, next: NextFunction) {
    try {
      const getAll = await this._service.read();
      return res.status(200).json(getAll);
    } catch (err) {
      next(err)
    }
  }

  public async readOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const getById = await this._service.readOne(id as string);
      return res.status(200).json(getById);
    } catch (err) {
      next(err)
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updated = await this._service.update(id, req.body);
      return res.status(200).json(updated);  
    } catch (err) {
      next(err)
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this._service.delete(id);
      return res.status(204).json();
    } catch (err) {
      next(err)
    }
  }
}

export default MotocycleController;