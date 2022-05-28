import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// import React from "react";
// import ReactDOM from "react-dom";

// import App from "./App";

// class Main extends React.Component {
//   render() {
//     return <App />;
//   }
// }

// const rootElement = document.getElementById("root");
// ReactDOM.render(<Main />, rootElement);
