import React from 'react';
import { Link } from 'react-router-dom';
const LandingPage = () => {
  return (
    <section>
      <header>
        <nav id="landing-nav">
          <article className="menu-icon">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjQiIGhlaWdodD0iMjQiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iIzAwODA4MCI+PHBhdGggZD0iTTIxLjUsMzUuODMzMzNjLTIuNTg0NTYsLTAuMDM2NTUgLTQuOTg4NTgsMS4zMjEzNiAtNi4yOTE1MywzLjU1Mzc2Yy0xLjMwMjk1LDIuMjMyNCAtMS4zMDI5NSw0Ljk5MzQyIDAsNy4yMjU4MmMxLjMwMjk1LDIuMjMyNCAzLjcwNjk3LDMuNTkwMzEgNi4yOTE1MywzLjU1Mzc2aDEyOWMyLjU4NDU2LDAuMDM2NTUgNC45ODg1OCwtMS4zMjEzNiA2LjI5MTUzLC0zLjU1Mzc2YzEuMzAyOTUsLTIuMjMyNCAxLjMwMjk1LC00Ljk5MzQyIDAsLTcuMjI1ODJjLTEuMzAyOTUsLTIuMjMyNCAtMy43MDY5NywtMy41OTAzMSAtNi4yOTE1MywtMy41NTM3NnpNMjEuNSw3OC44MzMzM2MtMi41ODQ1NiwtMC4wMzY1NSAtNC45ODg1OCwxLjMyMTM2IC02LjI5MTUzLDMuNTUzNzZjLTEuMzAyOTUsMi4yMzI0IC0xLjMwMjk1LDQuOTkzNDIgMCw3LjIyNTgyYzEuMzAyOTUsMi4yMzI0IDMuNzA2OTcsMy41OTAzMSA2LjI5MTUzLDMuNTUzNzZoMTI5YzIuNTg0NTYsMC4wMzY1NSA0Ljk4ODU4LC0xLjMyMTM2IDYuMjkxNTMsLTMuNTUzNzZjMS4zMDI5NSwtMi4yMzI0IDEuMzAyOTUsLTQuOTkzNDIgMCwtNy4yMjU4MmMtMS4zMDI5NSwtMi4yMzI0IC0zLjcwNjk3LC0zLjU5MDMxIC02LjI5MTUzLC0zLjU1Mzc2ek0yMS41LDEyMS44MzMzM2MtMi41ODQ1NiwtMC4wMzY1NSAtNC45ODg1OCwxLjMyMTM2IC02LjI5MTUzLDMuNTUzNzZjLTEuMzAyOTUsMi4yMzI0IC0xLjMwMjk1LDQuOTkzNDIgMCw3LjIyNTgyYzEuMzAyOTUsMi4yMzI0IDMuNzA2OTcsMy41OTAzMSA2LjI5MTUzLDMuNTUzNzZoMTI5YzIuNTg0NTYsMC4wMzY1NSA0Ljk4ODU4LC0xLjMyMTM2IDYuMjkxNTMsLTMuNTUzNzZjMS4zMDI5NSwtMi4yMzI0IDEuMzAyOTUsLTQuOTkzNDIgMCwtNy4yMjU4MmMtMS4zMDI5NSwtMi4yMzI0IC0zLjcwNjk3LC0zLjU5MDMxIC02LjI5MTUzLC0zLjU1Mzc2eiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+" />
          </article>

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
