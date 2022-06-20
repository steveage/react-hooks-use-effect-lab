import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(()=> handleTimer(), [timeRemaining]);

  function handleTimer() {
    let timerID = null;

    if(timeRemaining > 0) {
      timerID = setInterval(() => setTimeRemaining(timeRemaining => timeRemaining - 1), 1000);
    }
    else {
      onAnswered(false);
      setTimeRemaining(10);
      clearTimeout(timerID);
    }

    return () => clearTimeout(timerID);
  }

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
