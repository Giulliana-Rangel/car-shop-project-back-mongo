import express from 'express';
import routes from './Routes/Routes';
import MotorcycleRoutes from './Routes/MotorcycleRoutes';
import errorMiddleware from './middlewares/error-middleware';

const app = express();
app.use(express.json());
app.use(routes);
app.use(MotorcycleRoutes);

app.use(errorMiddleware);

export default app;
