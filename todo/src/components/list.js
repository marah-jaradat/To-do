import { useContext } from "react";
import { SettingsContext } from "../context/settings";
import { Button, Card, Elevation } from "@blueprintjs/core";

export default function List(props) {
  const settings = useContext(SettingsContext);
  if (settings.displaySettings) {
    return (
      <Card elevation={Elevation.TWO} key={props.item.id} className="list-card">
        <p>{props.item.text}</p>
        <p>
          <small>Assigned to: {props.item.assignee}</small>
        </p>
        <p>
          <small>Difficulty: {props.item.difficulty}</small>
        </p>
        <div onClick={() => props.toggleComplete(props.item.id)}>
          Complete: {props.item.complete.toString()}
        </div>
        <Button onClick={() => props.deleteItem(props.item.id)}>
          Delete Item
        </Button>
      </Card>
    );
  } else {
    if (!props.item.complete) {
      return (
        <Card key={props.item.id} className="list-card">
          <p>{props.item.text}</p>
          <p>
            <small>Assigned to: {props.item.assignee}</small>
          </p>
          <p>
            <small>Difficulty: {props.item.difficulty}</small>
          </p>
          <div onClick={() => props.toggleComplete(props.item.id)}>
            Complete: {props.item.complete.toString()}
          </div>
          <Button onClick={() => props.deleteItem(props.item.id)}>
            Delete Item
          </Button>
        </Card>
      );
    }
  }
}
