import React from "react";

const Answered = ({ answeredQuestions, handleEdit }) => {
  return (
    <div className="answered-questions">
      {answeredQuestions.length === 0 ? (
        <p className="no-answers-text">No answered questions</p>
      ) : (
        answeredQuestions.map((question) => (
          <div className="answered-item" key={question.id}>
            <p><strong>{question.question}</strong></p>
            <p><em>{question.answer}</em></p>
            <button onClick={() => handleEdit(question.id)}>Edit Answer</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Answered;
