// src/components/Quiz.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Quiz({ refresh }) { // Receive refresh prop from parent component
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  // Fetch quiz questions when the component mounts or when the refresh prop changes
  useEffect(() => {
    fetchQuestions();
  }, [refresh]); // Re-fetch when refresh prop changes

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/quiz');
      setQuestions(response.data.results);
    } catch (error) {
      console.error('Failed to fetch questions', error);
    }
  };

  const handleAnswerClick = (selectedOption) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correct_answer;

    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div>
      {showScore ? (
        <div>
          <h2>Your Score: {score} out of {questions.length}</h2>
        </div>
      ) : (
        questions.length > 0 && (
          <div>
            <h3>Category: {questions[currentQuestionIndex].category}</h3>
            <h4>Difficulty: {questions[currentQuestionIndex].difficulty}</h4>
            <p>{questions[currentQuestionIndex].question}</p>
            <div>
              {[...questions[currentQuestionIndex].incorrect_answers, questions[currentQuestionIndex].correct_answer]
                .sort(() => Math.random() - 0.5) // Shuffle the options
                .map((option, index) => (
                  <button key={index} onClick={() => handleAnswerClick(option)}>
                    {option}
                  </button>
                ))}
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default Quiz;
