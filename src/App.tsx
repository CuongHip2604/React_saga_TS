import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import history from 'router/history';
import { ACCESS_TOKEN } from 'shared/plugins/constants';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const Login = React.lazy(() => import('modules/auth/pages/Login'));
const Register = React.lazy(() => import('modules/auth/pages/Register'));
const TheLayout = React.lazy(() => import('shared/containers/TheLayout'));

function App() {
  const handleRedirec = () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) return false;
    return true;
  };

  return (
    <div className="app">
      <Router history={history}>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route
              exact
              path="/login"
              render={() => {
                return handleRedirec() ? <Redirect to="/" /> : <Login />;
              }}
            />
            <Route
              exact
              path="/register"
              render={() => {
                return handleRedirec() ? <Redirect to="/" /> : <Register />;
              }}
            />
            <Route
              path="/"
              render={() => {
                return handleRedirec() ? <TheLayout /> : <Redirect to="/login" />;
              }}
            />
          </Switch>
        </React.Suspense>
      </Router>
    </div>
  );
}

export default App;
