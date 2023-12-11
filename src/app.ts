import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes';
import regionRouter from './routes/region.routes';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to OzMap Tech Test API! Please use one of the routes: /api/users, /api/regions');
});

app.use('/api/users', userRouter);
app.use('/api/regions', regionRouter);

export default app;
