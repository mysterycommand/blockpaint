import React, { FC, ButtonHTMLAttributes } from 'react';
import './style.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {};

const Button: FC<ButtonProps> = ({ children, onClick, disabled }) => (
  <button className="button" onClick={onClick} disabled={disabled}>
    {children}
  </button>
);

export default Button;
