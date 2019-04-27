import React, { FC, ButtonHTMLAttributes } from 'react';

import Loader from '../loader';

import './style.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {};

const Button: FC<ButtonProps> = ({ children, disabled, onClick }) => (
  <button className="button" onClick={onClick} disabled={disabled}>
    {children}
    {disabled && <Loader />}
  </button>
);

export default Button;
