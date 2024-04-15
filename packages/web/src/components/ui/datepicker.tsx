// CustomDatePicker.tsx
import React from "react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css"; // Make sure this contains your custom styles

// Extend the props from ReactDatePicker if you need more customization
interface CustomDatePickerProps extends ReactDatePickerProps {}

const CustomDatePicker: React.FC<CustomDatePickerProps> = (props) => {
  return <DatePicker inline {...props} />;
};

export default CustomDatePicker;
