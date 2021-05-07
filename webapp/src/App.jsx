import React from 'react';
import Amplify from 'aws-amplify';
import './App.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { AmplifyAuthenticator, AmplifySignIn } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import Routes from './Routes';

Amplify.configure(window.appConfig);

const helmetContext = {};

function App() {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  React.useEffect(() => onAuthUIStateChange((nextAuthState, authData) => {
    setAuthState(nextAuthState);
    setUser(authData);
  }), []);

  return (
    <HelmetProvider context={helmetContext}>
      <Helmet
        titleTemplate="%s | Globomantics"
        defaultTitle="Document Management System"
      />
      { authState === AuthState.SignedIn && user ? (
        <Routes />
      ) : (
        <AmplifyAuthenticator>
          <AmplifySignIn
            slot="sign-in"
            usernameAlias="email"
            headerText="Document Management System"
            hideSignUp
          />
        </AmplifyAuthenticator>
      )}
    </HelmetProvider>
  );
}

export default App;
