import { isValidObjectId, Model } from 'mongoose';
import { IModel } from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  protected _model:Model<T>;

  constructor(model:Model<T>) {
    this._model = model;
  }

  public async create(obj: T):Promise<T> {
    return this._model.create({ ...obj });
  }

  public async read(): Promise<T[]> {
    return this._model.find({});
  }

  public async readOne(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) {
      throw Error('InvalidMongoId');
    }

    return this._model.findOne({ id });
  }

  public async update(id: string, obj: Partial<T>): Promise<T | null> {
    if (!isValidObjectId(id)) throw Error('InvalidMongoId');

    return this._model.findByIdAndUpdate(id, obj, { new: true });
  }

  public async delete(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error('InvalidMongoId');

    return this._model.findByIdAndDelete({ _id });
  }
}

export default MongoModel;
