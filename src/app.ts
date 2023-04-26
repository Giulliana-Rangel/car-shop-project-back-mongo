import express from 'express';
import routes from './Routes/Routes';
import MotorcycleRoutes from './Routes/MotorcycleRoutes';

const app = express();
app.use(express.json());
app.use(routes);
app.use(MotorcycleRoutes);

export default app;
