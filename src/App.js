import React from 'react';
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

function App() {
  return (
    <div className="app">
      <Router>
        
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

      </Router>
    </div>
  );
}

export default App;
