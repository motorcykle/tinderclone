import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import './App.css';

import Home from './views/Home';
import Header from './components/Header';
import Chat from './views/Chat';

function App() {
  return (
    <div className="app">
      <Header />
      <Router>
        <Route to="/" exact component={Home} />
        <Route to="/chat" exact component={Chat} />
      </Router>
    </div>
  );
}

export default App;
