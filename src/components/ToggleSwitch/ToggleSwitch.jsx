import React, { useContext } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        checked={currentTemperatureUnit === "C"}
        onChange={handleToggleSwitchChange}
      />
      <span className="slider" />
      <span className="labels">
        <span
          className={`label ${currentTemperatureUnit === "F" ? "active" : ""}`}
        >
          F
        </span>
        <span
          className={`label ${currentTemperatureUnit === "C" ? "active" : ""}`}
        >
          C
        </span>
      </span>
    </label>
  );
}

export default ToggleSwitch;
