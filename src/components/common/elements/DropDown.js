import React, { useState } from "react";
import Select from "react-select";

const options = [
  { value: "all", label: "전체" },
  { value: "roomnumber", label: "방번호" },
  { value: "roomname", label: "방제목" },
];

const Dropdown = () => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  return (
    <Select value={selectedOption} onChange={handleChange} options={options} />
  );
};

export default Dropdown;
