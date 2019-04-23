import React, { Component, MouseEvent } from 'react';
import logo from '../../logo.png';

import { AppConfig, Person, UserSession } from 'blockstack';

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
    window.location.assign(window.location.origin);
  };

  render() {
    const { userSession } = this.state;

    const isUserSignedIn = userSession.isUserSignedIn();
    const isSignInPending = userSession.isSignInPending();

    let content = (
      <button onClick={this.signIn} className="App-button">
        Sign in
      </button>
    );

    if (isUserSignedIn) {
      const { profile } = userSession.loadUserData();
      const person = new Person(profile);

      content = (
        <div>
          <p>Hello, {person.name() || 'nameless person'}</p>
          <button onClick={this.signOut} className="App-button">
            Sign out
          </button>
        </div>
      );
    } else if (isSignInPending) {
      userSession.handlePendingSignIn().then(userData => {
        window.location.assign(window.location.origin);
      });
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {content}
        </header>
      </div>
    );
  }
}

export default App;
