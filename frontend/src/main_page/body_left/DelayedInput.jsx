import React, { useState } from "react";

const DelayedInput = ({type, value, onFinalValueChange }) => {
  const [tempValue, setTempValue] = useState(value || ""); // Initialize with parent value

  return (
    <input
      type={type}
      value={tempValue}
      onChange={(e) => setTempValue(e.target.value)}
      onBlur={() => onFinalValueChange(tempValue)} // Send value to parent on blur
      onKeyDown={(e) => {
        if (e.key === "Enter") e.target.blur(); // Commit value on Enter
      }}
    />
  );
};

export default DelayedInput;