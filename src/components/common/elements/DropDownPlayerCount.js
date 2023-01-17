import React, { useState } from "react";
import Select from "react-select";

const options = [
  { value: "firstCount", label: "1" },
  { value: "secondCount", label: "2" },
  { value: "thirdCount", label: "3" },
  { value: "fourthCount", label: "4" },
];

const DropdownPlayerCount = () => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  return (
    <Select value={selectedOption} onChange={handleChange} options={options} />
  );
};

export default DropdownPlayerCount;
