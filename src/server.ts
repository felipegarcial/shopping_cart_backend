import express from 'express';
import { setupSwagger } from '@config/swagger'; 

import { productRoutes,cartRoutes } from './routes';

const app = express();

setupSwagger(app);

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

export default app;
