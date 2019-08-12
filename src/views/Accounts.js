import React, { Component } from 'react';
import HamburgerIcon from '../components/HamburgerIcon';
import AccountCard from '../components/AccountCard';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import makeRequest from '../services/apiRequest';

class Accounts extends Component {
  state = {
    userAccounts: [],
    isLoading: true
  };

  handleView = () => {};
  handleDelete = () => {};

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };
    const response = await makeRequest('/accounts', options);
    this.setState({ userAccounts: response.data, isLoading: false });
  }
  render() {
    const accounts = this.state.userAccounts.map(account => {
      const result = (
        <AccountCard
          key={account.ownerEmail}
          fullName={account.fullName}
          ownerEmail={account.ownerEmail}
          status={account.status}
          balance={account.balance}
          accountNumber={account.accountNumber}
          handleDelete={this.handleDelete}
          handleView={this.handleView}
        />
      );
      return result;
    });

    const template = this.state.isLoading ? <mark>Loading...</mark> : accounts;
    return (
      <>
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
                  <Link to="#">
                    <li>Accounts</li>
                  </Link>
                  <Link to="/">
                    <li>Log Out</li>
                  </Link>
                </ul>
              </article>
            </nav>
          </header>
          <main id="admin-dashboard-main">
            <section id="admin-dashboard-section">{template}</section>
          </main>
          <Footer />
        </section>
      </>
    );
  }
}

export default Accounts;
