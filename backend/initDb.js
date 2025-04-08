const mongoose = require('mongoose');
require('dotenv').config();

const initializeDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Get the database instance
    const db = mongoose.connection.db;

    // Create collections
    await db.createCollection('users');
    console.log('Users collection created');
    
    await db.createCollection('tasks');
    console.log('Tasks collection created');

    console.log('Database initialization completed successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    mongoose.connection.close();
  }
};

initializeDatabase(); 