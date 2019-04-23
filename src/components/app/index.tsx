import React, { Component, MouseEvent } from 'react';
import logo from '../../logo.png';

import { AppConfig, UserSession } from 'blockstack';

import './style.css';

type AppState = {
  appConfig: AppConfig;
  userSession: UserSession;
};

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);

    const appConfig = new AppConfig();
    const userSession = new UserSession({ appConfig });

    this.state = {
      appConfig,
      userSession,
    };
  }

  signIn = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    this.state.userSession.redirectToSignIn();
  };

  signOut = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    this.state.userSession.signUserOut();
  };

  render() {
    const { userSession } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {userSession.isUserSignedIn() ? (
            <button onClick={this.signOut} className="App-button">
              Sign out
            </button>
          ) : (
            <button onClick={this.signIn} className="App-button">
              Sign in
            </button>
          )}
        </header>
      </div>
    );
  }
}

export default App;
