import React, { useState } from 'react';
import { Select } from 'antd';
import countries from '../../constants/calls.json'; // Adjust the path as necessary

const { Option } = Select;

const PrefixSelector = ({ defaultValue, onChange }) => {
  const [selectedDialCode, setSelectedDialCode] = useState(defaultValue);

  const handleChange = (value) => {
    setSelectedDialCode(value);
    onChange(value);
  };

  return (
    <Select
      style={{
        width: 85,
      }}
      defaultValue={defaultValue}
      onChange={handleChange} // Update the selected dial code state when the value changes
    >
      {countries.map(({ dial_code}) => (
        <Option key={dial_code} value={dial_code}>{dial_code}</Option>
      ))}
    </Select>
  );
};

export default PrefixSelector;
