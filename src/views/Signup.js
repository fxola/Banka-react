import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import HamburgerIcon from '../components/HamburgerIcon';
import Footer from '../components/Footer';
import { signUpUserRequest } from '../actions/signUpAction';
import PropTypes from 'prop-types';
import Navigation from '../components/Navigation';

export class Signup extends Component {
  state = {
    users: {},
    isloading: false
  };
  firstnameRef = React.createRef();
  lastnameRef = React.createRef();
  emailRef = React.createRef();
  passowordRef = React.createRef();
  confirmPasswordRef = React.createRef();

  createNewuser = async e => {
    e.preventDefault();
    this.setState({ isloading: true });
    const user = {
      firstName: this.firstnameRef.current.value,
      lastName: this.lastnameRef.current.value,
      email: this.emailRef.current.value,
      password: this.passowordRef.current.value,
      confirmPassword: this.confirmPasswordRef.current.value
    };
    await this.props.dispatch(signUpUserRequest(user, this.props.history));
    this.setState({ isloading: false });
  };

  render() {
    const buttonText = this.state.isloading ? 'Loading...' : 'Register';
    return (
      <section>
        <Navigation />
        <main id="signup-main">
          <section id="signup-section">
            <form id="signup-form" onSubmit={this.createNewuser}>
              <article id="alert" />
              <input
                type="text"
                name="firstName"
                id="firstname"
                ref={this.firstnameRef}
                placeholder="First Name"
                required
              />
              <input
                type="text"
                name="lastName"
                id="lastname"
                ref={this.lastnameRef}
                placeholder="Last Name"
                required
              />
              <input
                type="email"
                name="email"
                id="email"
                ref={this.emailRef}
                placeholder="Email Address"
                required
              />

              <input
                type="password"
                placeholder="Password"
                name="password"
                ref={this.passowordRef}
                id="password"
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                ref={this.confirmPasswordRef}
                id="confirmpassword"
                required
              />

              <button id="register-button">{buttonText}</button>
              <p>
                <Link to="#">Forgot Password ?</Link>
              </p>
              <h3>
                Have an account?
                <span className="signup-link">
                  <Link to="/signin">Sign In</Link>
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

Signup.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export const mapStateToProps = state => {
  return {
    users: state.users
  };
};

export default connect(mapStateToProps)(Signup);
