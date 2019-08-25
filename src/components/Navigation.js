import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HamburgerIcon from '../components/HamburgerIcon';
class Navigation extends Component {
  state = {
    user: null
  };
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.setState({
        user
      });
    }
  }
  render() {
    const StaffLinks = () => (
      <>
        <Link to="/accounts">
          <li>Accounts</li>
        </Link>
        <Link to="/">
          <li
            onClick={() => {
              localStorage.clear();
            }}
          >
            Log Out
          </li>
        </Link>
      </>
    );

    const ClientLinks = () => (
      <>
        <Link to="/profile">
          <li>Profile</li>
        </Link>
        <Link to="#">
          <li>Transactions</li>
        </Link>
        <Link to="/">
          <li
            onClick={() => {
              localStorage.clear();
            }}
          >
            Log Out
          </li>
        </Link>
      </>
    );

    const DefaultLinks = () => (
      <>
        <Link to="/signin">
          <li>Log In</li>
        </Link>
        <Link to="/signup">
          <li>Register</li>
        </Link>
      </>
    );
    return (
      <header>
        <nav>
          <HamburgerIcon />
          <article className="logo"> Banka</article>
          <article className="menu">
            <ul>
              {this.state.user ? (
                this.state.user.type === 'client' ? (
                  <ClientLinks />
                ) : (
                  <StaffLinks />
                )
              ) : (
                <DefaultLinks />
              )}
            </ul>
          </article>
        </nav>
      </header>
    );
  }
}

export default Navigation;
