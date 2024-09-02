// src/App.js
import React, { useState } from 'react';
import Quiz from './components/Quiz';
import AddQuiz from './components/AddQuiz';

function App() {
  // State to trigger a re-fetch
  const [refresh, setRefresh] = useState(false);

  // Function to refresh questions
  const refreshQuestions = () => {
    setRefresh(!refresh); // Toggle the state to trigger re-fetch
  };

  return (
    <div className="App">
      <h1>Quiz App</h1>
      <Quiz refresh={refresh} /> {/* Pass refresh prop to Quiz component */}
      <hr />
      <AddQuiz onQuizAdded={refreshQuestions} /> {/* Pass refresh function to AddQuiz */}
    </div>
  );
}

export default App;
