import React, { Fragment, Component } from 'react';
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
import { PrivateRoute } from './components/PrivateRoute';
import SingleAccount from './views/SingleAccount';

const store = setupStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <Router>
            <ToastContainer autoClose={3000} />
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route path="/signup" exact component={Signup} />
              <Route path="/signin" exact component={Signin} />
              <PrivateRoute
                path="/accounts"
                exact
                component={Accounts}
                accessLevel={1}
              />
              <PrivateRoute
                path="/accounts/:accountNumber"
                exact
                component={SingleAccount}
                accessLevel={1}
              />
              <PrivateRoute
                path="/transactions"
                exact
                component={Transactions}
                accessLevel={0}
              />
              <PrivateRoute
                path="/profile"
                exact
                component={Profile}
                accessLevel={0}
              />
            </Switch>
          </Router>
        </Fragment>
      </Provider>
    );
  }
}

export default hot(module)(App);
