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
    const { userSession } = this.state;

    /**
     * @see: https://github.com/zone117x/blockstack-monero/blob/master/src/main.ts#L40-L46
     */
    const { origin, pathname } = window.location;
    userSession.redirectToSignIn(
      `${origin}${pathname}`,
      `${origin}${pathname}manifest.json`,
    );
  };

  signOut = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { userSession } = this.state;

    userSession.signUserOut();
    const { origin, pathname } = window.location;
    window.location.assign(`${origin}${pathname}`);
  };

  UNSAFE_componentWillMount() {
    const { userSession } = this.state;

    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((/* userData */) => {
        const { origin, pathname } = window.location;
        window.location.assign(`${origin}${pathname}`);
      });
    }
  }

  render() {
    const { userSession } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {userSession.isUserSignedIn() ? (
            <Canvas
              person={new Person(userSession.loadUserData().profile)}
              signOut={this.signOut}
            />
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
