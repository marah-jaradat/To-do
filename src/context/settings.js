import React, { useState, useEffect } from "react";

export const SettingsContext = React.createContext();

const Settings = (props) => {
  const [showCompleted, setCompleted] = useState(false);
  const [numItemsPerPage, setNumItemsPerPage] = useState(3);
  const [sortBy, setSortBy] = useState("assignee");

  const [initialRender, isInitialRender] = useState(true);

  useEffect(() => {
    if (!initialRender) {
      let settings = [showCompleted, numItemsPerPage, sortBy];
      localStorage.setItem("settings", JSON.stringify(settings));
    } else {
      isInitialRender(false);
    }
  }, [showCompleted, numItemsPerPage, sortBy]);

  useEffect(() => {
    if (localStorage.getItem("settings")) {
      let settings = JSON.parse(localStorage.getItem("settings"));
      console.log(
        "SETTINGS FROM LAST TIME: ",
        settings[0],
        settings[1],
        settings[2]
      );
      setCompleted(settings[0] || true);
      setNumItemsPerPage(settings[1] || 3);
      setSortBy(settings[2] || "difficultyHighToLow");
    }
  }, []);

  const values = {
    showCompleted,
    setCompleted,
    numItemsPerPage,
    setNumItemsPerPage,
    sortBy,
    setSortBy,
  };

  return (
    <SettingsContext.Provider value={values}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export default Settings;
