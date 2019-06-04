import React, { useState, MouseEvent, useRef, useEffect } from 'react';
import { AppConfig, Person, UserSession } from 'blockstack';

import Workspace from '../workspace';
import Splash from '../splash';
import { ToolType } from '../tools';

import './style.css';

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

export default function App() {
  const [currentTool, setCurrentTool] = useState(ToolType.Paint);
  const [isFetching, setIsFetching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!userSession.isSignInPending()) {
      return;
    }

    userSession.handlePendingSignIn().then((/* userData */) => {
      const { origin, pathname } = window.location;
      window.location.assign(`${origin}${pathname}`);
    });
  });

  function signIn(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    /**
     * @see: https://github.com/zone117x/blockstack-monero/blob/master/src/main.ts#L40-L46
     */
    const { origin, pathname } = window.location;
    userSession.redirectToSignIn(
      `${origin}${pathname}`,
      `${origin}${pathname}manifest.json`,
    );
  }

  function signOut(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    userSession.signUserOut();
    const { origin, pathname } = window.location;
    window.location.assign(`${origin}${pathname}`);
  }

  function fetchPainting() {
    const { current } = canvasRef;

    setIsFetching(true);
    return (!current
      ? Promise.resolve(JSON.stringify({}))
      : userSession.getFile('painting.json', {
          decrypt: false,
        })
    ).then(file => {
      setIsFetching(false);
      return file;
    });
  }

  function savePainting(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const { current } = canvasRef;
    if (!current) {
      return;
    }

    setIsSaving(true);
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
        setIsSaving(false);
      });
  }

  return (
    <div className="app">
      {userSession.isUserSignedIn() ? (
        <Workspace
          currentTool={currentTool}
          canvasRef={canvasRef}
          fetchPainting={fetchPainting}
          isFetching={isFetching}
          isSaving={isSaving}
          person={new Person(userSession.loadUserData().profile)}
          savePainting={savePainting}
          setCurrentTool={setCurrentTool}
          signOut={signOut}
        />
      ) : (
        <Splash signIn={signIn} />
      )}
    </div>
  );
}
