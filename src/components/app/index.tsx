import React, { Component, MouseEvent } from 'react';
import { AppConfig, Person, UserSession } from 'blockstack';

import './style.css';
import Workspace from '../workspace';
import Splash from '../splash';

type AppState = {
  appConfig: AppConfig;
  userSession: UserSession;
};

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);

    const appConfig = new AppConfig(['store_write', 'publish_data']);
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

  savePainting = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { userSession } = this.state;

    userSession.putFile('painting.bmp', '', {});
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
      <div className="app">
        {userSession.isUserSignedIn() ? (
          <Workspace
            person={new Person(userSession.loadUserData().profile)}
            signOut={this.signOut}
            savePainting={this.savePainting}
          />
        ) : (
          <Splash signIn={this.signIn} />
        )}
      </div>
    );
  }
}

export default App;
