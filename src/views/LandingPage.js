import React from 'react';
import { Link } from 'react-router-dom';
import HamburgerIcon from '../components/HamburgerIcon';

const LandingPage = () => {
  return (
    <section>
      <header>
        <nav id="landing-nav">
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
        <section id="hero">
          
          <h1>Want To Experience 21st Century Banking ?</h1>
          <Link to="/signin">
            <button>Let's Go</button>
          </Link>
        </section>
      </header>
      <main id="landing-page-main" />
      <footer>Hand-crafted By Afolabi &#x00A9; 2019</footer>
    </section>
  );
};

export default LandingPage;
