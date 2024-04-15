import React from "react";

// Update ButtonProps to accept children of type ReactNode
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

// Use children for rendering inside the button
const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
};

export default Button;
