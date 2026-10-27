
require('dotenv').config();

const mongoose = require('mongoose');
const Note = require('./models/Note');

const sampleNotes = [
  {
    title: 'Welcome to Notes API',
    content: 'This is my first note stored in MongoDB.',
    category: 'General'
  },
  {
    title: 'Complete assignment',
    content: 'Finish the MongoDB and Mongoose integration.',
    category: 'Work'
  },
  {
    title: 'Read a book',
    content: 'Spend 30 minutes reading before bed.',
    category: 'Personal'
  },
  {
    title: 'Build a project',
    content: 'Create a new application using Node.js.',
    category: 'Ideas'
  },
  {
    title: 'Learn Mongoose',
    content: 'Practice schemas, models, and CRUD operations.',
    category: 'Work'
  },
  {
    title: 'Weekend plans',
    content: 'Make time for hobbies and relaxation.',
    category: 'Personal'
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');

    await Note.insertMany(sampleNotes);

    console.log('Sample notes inserted successfully');
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
