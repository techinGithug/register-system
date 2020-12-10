import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AppState from "./context/appState";
import Login from "./components/login";
import Register from "./components/students/registerStudent";
import Main from "./components/main";
import Student from "./components/students/student";
import RegisterStudent from "./components/students/registerStudent";

import RegisterTeacher from "./components/teachers/registerTeacher";

function App() {
  return (
    <Router>
      <AppState>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/main" component={Main} />
          <Route path="/student" component={Student} />
          <Route path="/register-student" component={RegisterStudent} />
          <Route path="/register-teacher" component={RegisterTeacher} />
        </Switch>
      </AppState>
    </Router>
  );
}

export default App;
