// Plus ultra!

import express from 'express';
import carRoute from './routes/carRoute';
import motorcycleRoute from './routes/motorcycleRoute'
import errorHandler from './middleware/error';

const app = express();

app.use(express.json());

app.use(carRoute);
app.use(motorcycleRoute);

app.use(errorHandler);

export default app;