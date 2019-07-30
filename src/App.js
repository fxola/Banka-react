import React, { Fragment } from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './views/Signup';
import LandingPage from './views/LandingPage';
import Signin from './views/Signin';
import setupStore from '../src/store';
import { Provider } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const store = setupStore();

const App = () => {
  return (
    <Provider store={store}>
      <Fragment>
        <Router>
        <ToastContainer />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/signin" exact component={Signin} />
          </Switch>
        </Router>
      </Fragment>
    </Provider>
  );
};

export default hot(module)(App);
