import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Render the app into the main root element
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

// Expose renderReturnWidget globally to embed the widget anywhere on the page
console.log("renderReturnWidget loaded")
window.renderReturnWidget = function (containerId, config) {
  console.log("renderReturnWidget function is being called");

  const container = document.getElementById(containerId);
  if (container) {
    console.log(`Container found: #${containerId}`, container);
    // Render the App component to the container with the passed config
    ReactDOM.createRoot(container).render(<App config={config} />);
  } else {
    console.error(`No container found with id: ${containerId}`);
  }
};
console.log("window.renderReturnWidget has been set!");

// Performance reporting
reportWebVitals();
