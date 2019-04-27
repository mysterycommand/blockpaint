import React, { Component, MouseEvent } from 'react';
import { AppConfig, Person, UserSession } from 'blockstack';

import './style.css';
import Workspace from '../workspace';
import Splash from '../splash';

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

class App extends Component {
  private canvasRef = React.createRef<HTMLCanvasElement>();

  signIn = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

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

    userSession.signUserOut();
    const { origin, pathname } = window.location;
    window.location.assign(`${origin}${pathname}`);
  };

  savePainting = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const { current } = this.canvasRef;

    if (!current) {
      return;
    }

    userSession.putFile(
      'painting.json',
      JSON.stringify({
        data: current.toDataURL('image/png'),
        createdAt: Date.now(),
      }),
      {
        encrypt: false,
      },
    );
  };

  fetchPainting = () => {
    const { current } = this.canvasRef;

    return !current
      ? Promise.resolve(JSON.stringify({}))
      : userSession.getFile('painting.json', {
          decrypt: false,
        });
  };

  UNSAFE_componentWillMount() {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((/* userData */) => {
        const { origin, pathname } = window.location;
        window.location.assign(`${origin}${pathname}`);
      });
    }
  }

  render() {
    return (
      <div className="app">
        {userSession.isUserSignedIn() ? (
          <Workspace
            canvasRef={this.canvasRef}
            fetchPainting={this.fetchPainting}
            person={new Person(userSession.loadUserData().profile)}
            savePainting={this.savePainting}
            signOut={this.signOut}
          />
        ) : (
          <Splash signIn={this.signIn} />
        )}
      </div>
    );
  }
}

export default App;
