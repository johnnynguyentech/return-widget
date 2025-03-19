import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Render the app into the root element
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// window.renderReturnWidget = function (containerId, config) {
//   console.log("renderReturnWidget function is being called");

//   const container = document.getElementById(containerId);
//   if (container) {
//     console.log(`Container found: #${containerId}`, container);
//     ReactDOM.createRoot(container).render(<App config={config} />);
//   } else {
//     console.error(`No container found with id: ${containerId}`);
//   }
// };

// Performance reporting
reportWebVitals();
