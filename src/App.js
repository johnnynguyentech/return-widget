import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Question from "./Components/Question/Question";
import Answered from "./Components/Answered/Answered";

const questionsData = [
  {
    id: 1,
    question: "Choose the reason for your return",
    type: "text-enumerated",
    options: ["Wrong item", "Damaged item", "Size issues", "Other"],
  },
  {
    id: 2,
    question: "How many days ago did you receive your order?",
    type: "numerical",
  },
  {
    id: 3,
    question: "What image best describes the condition of your order?",
    type: "image-enumerated",
    options: [
      { src: "https://return-widget.web.app/Assets/Images/new-unopened.jpg", alt: "New unopened" },
      { src: "https://return-widget.web.app/Assets/Images/new-opened.jpg", alt: "New but opened" },
      { src: "https://return-widget.web.app/Assets/Images/used.jpg", alt: "Used" },
      { src: "https://return-widget.web.app/Assets/Images/very-used.jpg", alt: "Very used" },
      ],
  },
  {
    id: 4,
    question: "Do you have a receipt for this order?",
    type: "text-enumerated",
    options: ["Yes", "No"],
  },
  {
    id: 5,
    question: "Any additional comments or feedback?",
    type: "text-box",
  },
];

const App = ({ config }) => {
  const [logo, setLogo] = useState("https://return-widget.web.app/Assets/Images/logo.png");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [returnStatus, setReturnStatus] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [isAccordionOpen, setAccordionOpen] = useState(false);
  const popupRef = useRef(null);
  const accordionRef = useRef(null);
  const [accordionHeight, setAccordionHeight] = useState(0);
  const [warningMessage, setWarningMessage] = useState("");

  const setCSSVariables = (config) => {
    const root = document.documentElement;
    if (config.fontFamily)root.style.setProperty('--widget-font-family', config.fontFamily);
    if (config.fontSize) root.style.setProperty('--widget-font-size', config.fontSize);
    if (config.color) root.style.setProperty('--widget-color', config.color);
    if (config.backgroundColor) root.style.setProperty('--widget-background-color', config.backgroundColor);
    if (config.fontColor) root.style.setProperty('--widget-font-color', config.fontColor);
    if (config.logo) setLogo(config.logo);
  };

  useEffect(() => {
    if (config) {
      setCSSVariables(config);
    }
  }, [config]);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleAnswer = (questionId, answer) => {
    setAnsweredQuestions((prevState) => {
      const existingAnswer = prevState.find((q) => q.id === questionId);
      if (existingAnswer) {
        return prevState.map((q) =>
          q.id === questionId ? { ...q, answer } : q
        );
      }
      return [
        ...prevState,
        { id: questionId, answer, question: questionsData.find(q => q.id === questionId).question },
      ];
    });
  };

  const handleNextQuestion = () => {
    const currentQuestion = questionsData[currentQuestionIndex];
    if (currentQuestion.type !== "text-box") {
      const answered = answeredQuestions.find(q => q.id === currentQuestion.id);
      if (!answered || answered.answer === "") {
        setWarningMessage("Please answer this question before proceeding.");
        return;
      }
    }
    setWarningMessage("");
    if (currentQuestionIndex < questionsData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      evaluateReturn();
    }
  };

  const handleEdit = (questionId) => {
    setAccordionOpen(false);
    setCurrentQuestionIndex(questionsData.findIndex((q) => q.id === questionId));
  };

  const evaluateReturn = () => {
    const receiptAnswer = answeredQuestions.find((q) => q.id === 4);
    if (receiptAnswer && receiptAnswer.answer === "No") {
      setReturnStatus("Return Denied - No Receipt");
      return;
    }
    const daysAnswer = answeredQuestions.find((q) => q.id === 2);
    if (daysAnswer && parseInt(daysAnswer.answer) > 30) {
      setReturnStatus("Return Denied - Too Late");
    } else {
      setReturnStatus("Return Approved!");
    }
  };

  const handleFeedback = (status) => {
    setFeedback(status);
  };

  const toggleAccordion = () => {
    if (accordionRef.current) {
      setAccordionOpen((prev) => !prev);
      setAccordionHeight(isAccordionOpen ? 0 : accordionRef.current.scrollHeight - 2);
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setAnsweredQuestions([]);
    setCurrentQuestionIndex(0);
    setReturnStatus(null);
    setFeedback(null);
    setWarningMessage("");
    setAccordionOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        handleClosePopup();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="widget-container">
      <button className="start-return-btn" onClick={handleOpenPopup}>
        Start Your Return
      </button>

      {isPopupOpen && (
        <div className="overlay">
          <div className="popup" ref={popupRef}>
            <div className="popup-header">
              <h2>Start Your Return</h2>
              <img src={logo} alt="logo" />
            </div>
            <div className="popup-body">
              {returnStatus ? (
                <div className="return-status">
                  <h3>{returnStatus}</h3>
                  <div className="feedback">
                    {!feedback && (
                      <>
                        <h4>Rate your return experience:</h4>
                        <button className="feedback-btn" onClick={() => handleFeedback("thumbs-up")}>
                          <img src="https://return-widget.web.app/Assets/Images/thumbs-up-solid.svg"/>
                        </button>
                        <button className="feedback-btn" onClick={() => handleFeedback("thumbs-down")}>
                          <img src="https://return-widget.web.app/Assets/Images/thumbs-down-solid.svg"/>
                        </button>
                      </>
                    )}
                  </div>
                  {feedback && <p>Thank you for your feedback!</p>}
                  <button className="close-btn" onClick={handleClosePopup}>Close</button>
                </div>
              ) : (
                <>
                  <Question
                    key={questionsData[currentQuestionIndex].id}
                    question={questionsData[currentQuestionIndex]}
                    handleAnswer={handleAnswer}
                    existingAnswer={answeredQuestions.find(q => q.id === questionsData[currentQuestionIndex].id)?.answer || ""}
                  />
                  {warningMessage && <p className="warning-text">{warningMessage}</p>}
                  <button className="next-btn" onClick={handleNextQuestion}>Next</button>
                </>
              )}
            </div>
            <div className="answered-container">
              <button className="accordion-toggle" onClick={toggleAccordion}>
                Answered Questions <i className={`fa-solid ${isAccordionOpen ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
              </button>
              <div 
                className="accordion-content" 
                ref={accordionRef} 
                style={{ 
                  height: isAccordionOpen ? `${accordionHeight}px` : "0px", 
                  overflow: "hidden",
                  transition: "height 0.3s ease"
                }}
              >
                <Answered answeredQuestions={answeredQuestions} handleEdit={handleEdit} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default App;
