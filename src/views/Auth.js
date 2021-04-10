import React from 'react';
import { auth, provider } from '../firebase';

const Auth = () => {

  const authMethod = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {

      }).catch((error) => {

      });
  }

  return (
    <div>
      <button onClick={authMethod}>
        LOGIN WITH GOOGLE
      </button>
    </div>
  );
}

export default Auth;
