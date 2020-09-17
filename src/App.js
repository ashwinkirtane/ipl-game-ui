import React from 'react';
import './App.css';
import Dashboard from './Dashboard';
import Login from './Login';
import {  Route, Switch, Redirect } from 'react-router-dom';

function App() {
  return (
    <main>
        <Switch>
            <PrivateRoute path="/" exact>
                <Dashboard></Dashboard>
            </PrivateRoute>
            <Route path="/login">
              <Login></Login>
            </Route>
        </Switch>
    </main>
  )
}

function PrivateRoute({ children, ...rest }) {
  const username = sessionStorage.getItem('username');
  const password = sessionStorage.getItem('password');
  
  return (
    <Route
      {...rest}
      render={({ location }) =>
      (username &&  password) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default App;
