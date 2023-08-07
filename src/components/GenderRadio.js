import React from "react";

function GenderRadio({ name = {}, checked = {}, onChange = {}, value = {} }) {
  return (
    <div>
      <label>
        <input
          type="radio"
          value={value}
          checked={checked}
          onChange={(e) => onChange(e)}
          name={name}
        />
        남
      </label>
      <label>
        <input
          type="radio"
          value={value}
          checked={checked}
          onChange={(e) => onChange(e)}
          name={name}
        />
        여
      </label>
    </div>
  );
}

export default GenderRadio;
