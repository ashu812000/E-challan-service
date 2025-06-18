const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://ayushitinker:rvvJ58DMfubQlL6a@cluster0.05kt6bd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB Atlas')).catch((err) => console.error('MongoDB connection error:', err));
