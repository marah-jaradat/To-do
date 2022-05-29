import useForm from "../hooks/form";
import { SettingsContext } from "../context/settings";
import { useContext } from "react";
import { Switch } from "@blueprintjs/core";
import "./form.css";

export default function Form(props) {
  const { handleChange, handleSubmit } = useForm(props.addItem);
  const setting = useContext(SettingsContext);
  const handleClick = () => {
    setting.setDisplaySettings(!setting.displaySettings);
    console.log(setting.displaySettings);
  };
  const handleNChange = (e) => {
    setting.setNumberItems(parseInt(e.target.value));
  };
  const storageHandler = (e) => {
    localStorage.setItem("settings", JSON.stringify(setting));
  };

  return (
    <div>
      <form id="for" onSubmit={handleSubmit}>
        <h3 id="header">Add new To-Do item:</h3>

        <label>
          <span>To Do Item</span>
          <input
            onChange={handleChange}
            name="text"
            type="text"
            placeholder="Item Details"
          />
        </label>

        <label>
          <span>Assigned To</span>
          <input
            onChange={handleChange}
            name="assignee"
            type="text"
            placeholder="Assignee Name"
          />
        </label>

        <label>
          <span>Difficulty</span>
          <input
            onChange={handleChange}
            defaultValue={3}
            type="range"
            min={1}
            max={5}
            name="difficulty"
          />
        </label>

        <label>
          <button type="submit">Add Item</button>
        </label>
      </form>
      <br></br>
      <Switch checked={setting.displaySettings} onClick={handleClick}>
        Display completed Items
      </Switch>
      <br></br>
      <br></br>
      <button onClick={props.handleSort} className="sortB">
        Sort by Difficulty
      </button>
      <button onClick={props.handleSort} className="sortB">
        Sort by Assignee
      </button>
      <input
        onChange={handleNChange}
        placeholder={`Items/Page ${setting.numberItems}`}
        type="number"
        min={1}
      />
      <button onClick={storageHandler} className="sortB">
        Save Settings
      </button>
    </div>
  );
}
