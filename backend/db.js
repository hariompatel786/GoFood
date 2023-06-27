
const mongoURI = 'mongodb+srv://hariompatel:patel786@cluster0.so35eac.mongodb.net/gofood?retryWrites=true&w=majority';

const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
    });
    console.log('Connected to MongoDB');
    const db = mongoose.connection;

    const fetchedData = await db.collection("food_items").find({}).toArray();
    const catData = await db.collection("food_category").find({}).toArray();

    global.food_items = fetchedData;
    global.food_category = catData;

  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
  }
};

connectToDatabase();
