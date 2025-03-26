import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";


// Expose the widget render function to the global scope
window.renderReturnWidget = function (containerId, config) {
  const container = document.getElementById(containerId);
  if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(
      <React.StrictMode>
        <App config={config} />
      </React.StrictMode>
    );
  } else {
    console.error(`Container with id "${containerId}" not found`);
  }
  };
  
  // Remove the default render if it's being used as a widget
  if (!document.getElementById("widget-container")) {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
    );
  }
  
  // Performance reporting
  reportWebVitals();