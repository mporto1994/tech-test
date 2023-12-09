import express from 'express';
import dotenv from 'dotenv';
import connectToDatabase from './database';
import userRouter from './routes/user.routes';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to OzMap Tech Test API! Pleas use one of the routes: /api/users, /api/regions');
});

app.use('/api/users', userRouter);


async function startApp() {
    try {
        await connectToDatabase();
        const PORT = process.env.PORT || 3003;
        const server = app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start the app:', error);
    }
}

startApp();
