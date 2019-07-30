import React from 'react';
import { Link } from 'react-router-dom';
import HamburgerIcon from '../components/HamburgerIcon';
const Signin = () => {
  return (
    <section>
      <header>
        <nav>
          <HamburgerIcon />

          <article className="logo">
            {' '}
            <Link to="/">Banka</Link>
          </article>

          <article className="menu">
            <ul>
              <Link to="/signin">
                <li>Log In</li>
              </Link>
              <Link to="/signup">
                <li>Register</li>
              </Link>
            </ul>
          </article>
        </nav>
      </header>
      <main id="signin-main">
        <section id="signin-section">
          <form id="signin-form">
            <article id="alert" />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required = "required"
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              id="password"
              required
            />
            <button id="login-button">Log in</button>
            <p>
              <Link to="#">
                Forgot Password ?
              </Link>
            </p>
            <h3>
              Don't have an account?
              <span className="signup-link">
                <Link to="/signup">
                  Sign Up
                </Link>
              </span>
            </h3>
          </form>
        </section>
      </main>
      <footer>Hand-crafted By Afolabi &#x00A9; 2019</footer>
    </section>
  );
};

export default Signin;
