// server.js
const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/quizapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Quiz Question Schema
const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String,
  category: String,
  difficulty: String
});

const Question = mongoose.model('Question', questionSchema);

// API endpoint to add a new quiz
app.post('/api/add-quiz', async (req, res) => {
  const { question, options, answer, category, difficulty } = req.body;

  // Validate incoming data
  if (!question || !options || !answer || !category || !difficulty) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newQuestion = new Question({ question, options, answer, category, difficulty });
    await newQuestion.save();
    res.json({ message: 'Quiz question added successfully!' });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ error: 'Failed to add question' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
