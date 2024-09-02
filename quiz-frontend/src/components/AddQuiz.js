// src/components/AddQuiz.js
import React, { useState } from 'react';  // Import React and useState
import axios from 'axios'; // Import axios

function AddQuiz({ onQuizAdded }) { // Receive the refresh function as a prop
  // State for managing form inputs and messages
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that all fields are filled
    if (!question || !answer || !category || !difficulty || options.some(option => option === '')) {
      setMessage('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/add-quiz', {
        question,
        options,
        answer,
        category,
        difficulty
      });
      setMessage(response.data.message);
      clearForm();

      // Trigger re-fetch of questions
      if (onQuizAdded) {
        onQuizAdded(); // Call the refresh function passed from the parent
      }
    } catch (error) {
      console.error(error); // Log the error in the console
      setMessage('Failed to add quiz question');
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const clearForm = () => {
    setQuestion('');
    setOptions(['', '', '', '']);
    setAnswer('');
    setCategory('');
    setDifficulty('easy');
  };

  return (
    <div>
      <h2>Add a New Quiz Question</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Question:</label>
          <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
        </div>
        <div>
          <label>Options:</label>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
            />
          ))}
        </div>
        <div>
          <label>Correct Answer:</label>
          <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
        </div>
        <div>
          <label>Category:</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <div>
          <label>Difficulty:</label>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <button type="submit">Add Quiz</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddQuiz;
