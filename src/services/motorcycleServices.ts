import { IService } from '../interfaces/IService';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';
import { IMotorcycleSchema, IMotorcycle } from '../interfaces/IMotorcycle';

class MotorcycleService implements IService<IMotorcycle> {
  private _moto:IModel<IMotorcycle>;

  constructor(model:IModel<IMotorcycle>) {
    this._moto = model;
  }

  async create(obj:unknown):Promise<IMotorcycle> {
    const parsed = IMotorcycleSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._moto.create(parsed.data);
  }

  async read(): Promise<IMotorcycle[]> {
    const moto = await this._moto.read();
    if (!moto) throw new Error(ErrorTypes.EntityNotFound);

    return moto;
  }

  async readOne(_id:string):Promise<IMotorcycle> {
    const moto = await this._moto.readOne(_id);
    if (!moto) throw new Error(ErrorTypes.EntityNotFound);

    return moto;
  }

  async update(_id: string, obj: unknown): Promise<IMotorcycle> {
    const parsed = IMotorcycleSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;

    const moto = await this._moto.update(_id, parsed.data);
    if (!moto) throw new Error(ErrorTypes.EntityNotFound);

    return moto;
  }

  async delete(_id: string): Promise<IMotorcycle> {
    const moto = await this._moto.delete(_id);
    if (!moto) throw new Error(ErrorTypes.EntityNotFound);
    return moto;
  }
}

export default MotorcycleService;
