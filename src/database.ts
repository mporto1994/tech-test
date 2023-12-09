const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    const mongoURL = process.env.MONGO_URL;

    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Conectado ao MongoDB!');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    throw error;
  }
}
export default connectToDatabase;
