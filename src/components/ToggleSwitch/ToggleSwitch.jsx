// src/components/ToggleSwitch/ToggleSwitch.jsx
import React, { useContext } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

// component: temp unit toggle
function ToggleSwitch() {
  // state: current unit + toggle handler
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  // ui: switch layout
  return (
    <label className="toggle-switch">
      {/* ui: checkbox controller */}
      <input
        type="checkbox"
        checked={currentTemperatureUnit === "C"}
        onChange={handleToggleSwitchChange}
      />

      {/* ui: sliding knob */}
      <span className="slider" />

      {/* ui: labels */}
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
