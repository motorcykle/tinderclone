import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import './App.css';

import Home from './views/Home';
import Header from './components/Header';
import Chats from './views/Chats';
import Profile from './views/Profile';
import ViewProfile from './views/ViewProfile';
import OpenChat from './views/OpenChat';
import db, { auth } from './firebase';
import Auth from './views/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser, setData } from './features/userSlice';
import { removeProfileUID, removeSelectedChat, selectProfileUID } from './features/appSlice';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const profileUID = useSelector(selectProfileUID);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged( user => {
      if (user) {
        const { uid, photoURL, email, displayName } = user;
        dispatch(login({ uid, photoURL, email, displayName }));
      } else {
        dispatch(logout());
        dispatch(removeProfileUID());
        dispatch(removeSelectedChat());
      }
    })

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = db
    .collection("users").doc(user.uid)
    .onSnapshot((doc) => {
      dispatch(setData(doc.data()));
    });

    return unsubscribe;
  }, [user])

  return (
    <div className="app">

      {profileUID && <ViewProfile />}

      {!user ? 
      <Auth />
      :
      (<Router>
        
        <Route path="/" exact>
          <Header />
          <Home />
        </Route>

        <Route path="/chat" exact>
          <Header backButton="/" />
          <Chats />
        </Route>

        <Route path="/chat/:chatId" exact>
          <Header backButton="/chat" />
          <OpenChat />
        </Route>

        <Route path="/profile" exact>
          <Header backButton="/" />
          <Profile />
        </Route>

      </Router>)}
    </div>
  );
}

export default App;
