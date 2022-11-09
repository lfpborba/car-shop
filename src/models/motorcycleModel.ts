import { model as mongooseCreateModel, Schema } from 'mongoose';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import MongoModel from './MongoModel';

const motocycleSchema = new Schema<IMotorcycle>({ 
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  engineCapacity: Number,
  category: String,
}, { versionKey: false });

class MotoModel extends MongoModel<IMotorcycle> {
  constructor(model = mongooseCreateModel('Motorcycle', motocycleSchema)) {
    super(model);
  }
}

export default MotoModel;