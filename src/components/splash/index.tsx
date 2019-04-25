import React, { FC, MouseEvent } from 'react';

import Button from '../button';

import './style.css';

import logo from '../../logo.svg';

type SplashProps = {
  signIn: (event: MouseEvent<HTMLButtonElement>) => void;
};

const Splash: FC<SplashProps> = ({ signIn }) => (
  <header className="splash">
    <img src={logo} className="splash-logo" alt="logo" />
    <Button onClick={signIn}>Sign in</Button>
  </header>
);

export default Splash;
