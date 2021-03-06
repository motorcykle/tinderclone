import { Button } from '@material-ui/core';
import React from 'react';
import db, { auth, provider } from '../firebase';

const Auth = () => {

  const authMethod = () => {
    auth
      .signInWithPopup(provider)
      .then((data) => {
        const { displayName, photoURL, email, uid } = data.user;

        if (data.additionalUserInfo.isNewUser) {
          db
          .collection("users")
          .doc(data.user.uid)
          .set({
            user: { 
              displayName, photoURL, email, uid,
              preference: '',
              gender: '',
              age: 0
            },
            profile: {
              chosenImage: '',
              images: [],
              description: '',
            },
            swipedOn: [uid],
            swipedRight: []
          })
          .then(() => {
            console.log("Document successfully written!");
          });
        }
      }).catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <Button variant="outlined" onClick={authMethod}>
        LOGIN WITH GOOGLE
      </Button>
    </div>
  );
}

export default Auth;
