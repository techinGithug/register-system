import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import AppState from "./context/appState";
import Login from "./components/login";
import Register from "./components/students/registerStudent";
import Admin from "./components/admins/admin";
import Student from "./components/students/student";
import RegisterStudent from "./components/students/registerStudent";
import Teacher from "./components/teachers/teacher";
import RegisterTeacher from "./components/teachers/registerTeacher";
import AdminStudent from "./components/admins/admin-student";

function App() {
  return (
    <Router>
      <AppState>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/admin" component={Admin} />
          <Route path="/admin-student" component={AdminStudent} />
          <Route path="/student" component={Student} />
          <Route path="/register-student" component={RegisterStudent} />
          <Route path="/teacher" component={Teacher} />
          <Route path="/register-teacher" component={RegisterTeacher} />
        </Switch>
      </AppState>
    </Router>
  );
}

export default App;
