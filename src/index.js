import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Render the app into the main root element
ReactDOM.createRoot(document.getElementById('root')).render(
  <App /> 
);

// Expose renderReturnWidget globally to embed the widget anywhere on the page
window.renderReturnWidget = function (containerId, config) {
  const container = document.getElementById(containerId);
  if (container) {
    ReactDOM.createRoot(container).render(<App config={config} />);
  } else {
    console.error(`Container with ID "${containerId}" not found`);
  }
};


// Performance reporting
reportWebVitals();
