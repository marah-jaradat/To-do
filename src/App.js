import React from "react";
import "./App.css";
import ToDo from "./components/todo";
import Settings from "./context/settings";
import "./components/form.css";
function App() {
  return (
    <div className="App">
      <Settings>
        <ToDo />
      </Settings>
    </div>
  );
}
export default App;
