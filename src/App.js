import React, { Fragment } from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from '../src/components/Signup';
import LandingPage from '../src/components/LandingPage';
import Signin from '../src/components/Signin';

const App = () => {
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/signin" exact component={Signin} />
        </Switch>
      </Router>
    </Fragment>
  );
};

export default hot(module)(App);
