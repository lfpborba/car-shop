import { z } from 'zod';

const VehicleZodSchema = z.object({
  model: z.string(),
  year: z.number().int().min(1900).max(2022),
  color: z.string().min(3),
  status: z.boolean().optional(),
  buyValue: z.number().int(),
});

type IVehicle = z.infer<typeof VehicleZodSchema>;

export { VehicleZodSchema, IVehicle };
