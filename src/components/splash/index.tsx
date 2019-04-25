import React, { FC, MouseEvent } from 'react';

import logo from '../../logo.svg';

import './style.css';

type SplashProps = {
  signIn: (event: MouseEvent<HTMLButtonElement>) => void;
};

const Splash: FC<SplashProps> = ({ signIn }) => (
  <header className="splash">
    <img src={logo} className="splash-logo" alt="logo" />

    <button onClick={signIn} className="splash-button">
      Sign in
    </button>
  </header>
);

export default Splash;
