import React, { FC, DOMAttributes } from 'react';
import './style.css';

type ButtonProps = DOMAttributes<HTMLButtonElement> & {};

const Button: FC<ButtonProps> = ({ children, onClick }) => (
  <button className="button" onClick={onClick}>
    {children}
  </button>
);

export default Button;
