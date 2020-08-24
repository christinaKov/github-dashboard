import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import MainPage from './MainPage';
import RepositoryDetail from './RepositoryDetail';


function App() {

  return (
    <Router>
      <Switch>
        <Route path='/' exact component={MainPage} />
        <Route path='/:id' component={RepositoryDetail} />
      </Switch>
    </Router>
  );
}

export default App;
