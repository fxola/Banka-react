import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HamburgerIcon from '../components/HamburgerIcon';
import Footer from '../components/Footer';
import { connect } from 'react-redux';
import { logInUserRequest } from '../actions/loginAction';
import Navigation from '../components/Navigation';

export class Signin extends Component {
  state = {
    email: '',
    password: '',
    isLoading: false
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ isLoading: true });
    await this.props.LoginUserRequest(this.state, this.props.history);
    this.setState({ isLoading: false });
  };

  render() {
    const buttonText = this.state.isLoading ? 'Loading...' : 'Log in';
    return (
      <section>
        <Navigation />
        <main id="signin-main">
          <section id="signin-section">
            <form id="signin-form" onSubmit={this.handleSubmit}>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                required="required"
                onChange={this.handleChange}
              />
              <input
                type="password"
                placeholder="password"
                name="password"
                id="password"
                required
                onChange={this.handleChange}
              />
              <button id="login-button">{buttonText}</button>
              <p>
                <Link to="#">Forgot Password ?</Link>
              </p>
              <h3>
                Don't have an account?
                <span className="signup-link">
                  <Link to="/signup">Sign Up</Link>
                </span>
              </h3>
            </form>
          </section>
        </main>
        <Footer />
      </section>
    );
  }
}
export const mapDispatchToProps = dispatch => {
  return {
    LoginUserRequest: async (userCredentials, history) => {
      return dispatch(await logInUserRequest(userCredentials, history));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Signin);
