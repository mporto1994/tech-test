import app from './app';
import connectToDatabase from './database';

export async function startApp() {
    try {
        await connectToDatabase();
        const PORT = process.env.PORT || 3003;

        const server = app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}`);
        });

        return server;
    } catch (error) {
        console.error('Failed to start the app:', error);
    }
}

startApp();
