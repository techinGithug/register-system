import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AppState from "./context/appState";
import Login from "./components/login";
import Register from "./components/register";
import Main from "./components/main";

function App() {
  return (
    <Router>
      <AppState>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/main" component={Main} />
        </Switch>
      </AppState>
    </Router>
  );
}

export default App;
