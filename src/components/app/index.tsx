import React, { Component, MouseEvent } from 'react';
import logo from '../../logo.svg';

import { AppConfig, Person, UserSession } from 'blockstack';

import './style.css';
import Canvas from '../canvas';

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

    /**
     * @see: https://github.com/zone117x/blockstack-monero/blob/master/src/main.ts#L40-L46
     */
    const { origin, pathname } = window.location;
    this.state.userSession.redirectToSignIn(
      `${origin}${pathname}`,
      `${origin}${pathname}manifest.json`,
    );
  };

  signOut = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    this.state.userSession.signUserOut();

    const { origin, pathname } = window.location;
    window.location.assign(`${origin}${pathname}`);
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

      content = <Canvas person={person} signOut={this.signOut} />;
    } else if (isSignInPending) {
      userSession.handlePendingSignIn().then((/* userData */) => {
        const { origin, pathname } = window.location;
        window.location.assign(`${origin}${pathname}`);
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
