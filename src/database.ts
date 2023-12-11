const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    const mongoURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/?retryWrites=true&w=majority`;

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
