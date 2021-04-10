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
import OpenChat from './views/OpenChat';
import { auth } from './firebase';
import Auth from './views/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged( user => {
      if (user) {
        const { uid, photoURL, email, displayName } = user;
        dispatch(login({ uid, photoURL, email, displayName }));
      } else {
        dispatch(logout());
      }
    })

    return unsubscribe;
  }, []);

  return (
    <div className="app">
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
