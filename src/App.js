import React, { Fragment } from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import setupStore from '../src/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './views/Signup';
import LandingPage from './views/LandingPage';
import Signin from './views/Signin';
import Accounts from './views/Accounts';
import Transactions from './views/Transactions';
import Profile from './views/Profile';

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
            <Route path="/accounts" exact component={Accounts} />
            <Route path="/transactions" exact component={Transactions} />
            <Route path="/profile" exact component={Profile} />
          </Switch>
        </Router>
      </Fragment>
    </Provider>
  );
};

export default hot(module)(App);
