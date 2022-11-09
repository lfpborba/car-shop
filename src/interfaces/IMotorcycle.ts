import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

const IMotorcycleSchema = VehicleZodSchema.extend({
  category: 
    z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: 
    z.number({
      required_error: 'Engine Capacity is required',
      invalid_type_error: 'Engine Capacity must be a number',
    }).int().positive().lte(2500, { message: 'Engine Capacity should be equal or less 2500 ' }),
});

type IMotorcycle = z.infer<typeof IMotorcycleSchema>;
export { IMotorcycleSchema, IMotorcycle };
