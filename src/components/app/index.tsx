import React, { Component, MouseEvent } from 'react';
import { AppConfig, Person, UserSession } from 'blockstack';

import Workspace from '../workspace';
import Splash from '../splash';
import { ToolType } from '../tools';

import './style.css';

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

type AppState = {
  currentTool: ToolType;
  isFetching: boolean;
  isSaving: boolean;
};

class App extends Component<{}, AppState> {
  private canvasRef = React.createRef<HTMLCanvasElement>();

  public state = {
    currentTool: ToolType.Paint,
    isFetching: false,
    isSaving: false,
  };

  public signIn = (event: MouseEvent<HTMLButtonElement>) => {
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

  public signOut = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    userSession.signUserOut();
    const { origin, pathname } = window.location;
    window.location.assign(`${origin}${pathname}`);
  };

  public savePainting = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const { current } = this.canvasRef;

    if (!current) {
      return;
    }

    this.setState({ isSaving: true });
    userSession
      .putFile(
        'painting.json',
        JSON.stringify({
          data: current.toDataURL('image/png'),
          createdAt: Date.now(),
        }),
        {
          encrypt: false,
        },
      )
      .then(() => {
        this.setState({ isSaving: false });
      });
  };

  public fetchPainting = () => {
    const { current } = this.canvasRef;

    this.setState({ isFetching: true });
    return (!current
      ? Promise.resolve(JSON.stringify({}))
      : userSession.getFile('painting.json', {
          decrypt: false,
        })
    ).then(file => {
      this.setState({ isFetching: false });
      return file;
    });
  };

  public setCurrentTool = (currentTool: ToolType) => {
    this.setState({ currentTool });
  };

  public UNSAFE_componentWillMount() {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((/* userData */) => {
        const { origin, pathname } = window.location;
        window.location.assign(`${origin}${pathname}`);
      });
    }
  }

  public render() {
    const { currentTool, isFetching, isSaving } = this.state;

    return (
      <div className="app">
        {userSession.isUserSignedIn() ? (
          <Workspace
            currentTool={currentTool}
            canvasRef={this.canvasRef}
            fetchPainting={this.fetchPainting}
            isFetching={isFetching}
            isSaving={isSaving}
            person={new Person(userSession.loadUserData().profile)}
            savePainting={this.savePainting}
            setCurrentTool={this.setCurrentTool}
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
