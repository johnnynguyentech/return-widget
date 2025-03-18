import React, { useState, useEffect } from "react";

const Question = ({ question, handleAnswer, existingAnswer }) => {
  const [answer, setAnswer] = useState(existingAnswer || "");

  useEffect(() => {
    setAnswer(existingAnswer || "");
  }, [existingAnswer]);

  const handleTextAnswer = (e) => {
    setAnswer(e.target.value);
    handleAnswer(question.id, e.target.value);
  };

  const handleNumberAnswer = (e) => {
    if (!isNaN(e.target.value) && e.target.value > 0) {
      setAnswer(e.target.value);
      handleAnswer(question.id, e.target.value);
    }
  };

  const handleOptionAnswer = (answer) => {
    setAnswer(answer);
    handleAnswer(question.id, answer);
  };

  const handleImageAnswer = (answer) => {
    setAnswer(answer);
    handleAnswer(question.id, answer);
  };

  return (
    <div className="question">
      <p>{question.question}</p>
      {question.type === "text-box" && (
        <input className="textbox-input" type="text" value={answer} onChange={handleTextAnswer} />
      )}
      {question.type === "numerical" && (
        <input className="number-input" type="number" value={answer} min="1" onChange={handleNumberAnswer} />
      )}
      {question.type === "text-enumerated" && (
        <div>
          {question.options.map((option, index) => (
            <button className={`option-btn ${answer === option ? "selected" : ""}`} key={index} onClick={() => handleOptionAnswer(option)}>
              {option}
            </button>
          ))}
        </div>
      )}
      {question.type === "image-enumerated" && (
        <div className="picture-container">
          {question.options.map((option, index) => (
            <div className={`picture-option ${answer === option.alt ? "selected" : ""}`} onClick={() => handleImageAnswer(option.alt)}>
              <p>{option.alt}</p>
              <img
                key={index}
                src={option.src}
                alt={option.alt}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Question;
