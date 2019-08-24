import React, { Component } from 'react';
import HamburgerIcon from '../components/HamburgerIcon';
import AccountCard from '../components/AccountCard';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { connect } from 'react-redux';
import { fetchAccountsRequest } from '../actions/fetchAccountsAction';
import { toast } from 'react-toastify';

export class Accounts extends Component {
  handleView = accountNumber => {
    this.props.history.push(`accounts/${accountNumber}`);
  };
  handleDelete = () => {};

  async componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.props.fetchAccountsRequest(user.token);
  }

  render() {
    const accounts = this.props.userAccounts.user ? (
      this.props.userAccounts.user.map(account => {
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
      })
    ) : (
      <mark>Loading...</mark>
    );

    let error;
    if (this.props.userAccounts.error) {
      error =
        this.props.userAccounts.error === 'Failed to fetch' &&
        'Something Went Wrong. Please Check Your Connection and Try Again';
      toast.error(error);
    }

    const template = this.props.userAccounts.error ? (
      <mark>{error}</mark>
    ) : (
      accounts
    );

    return (
      <>
        <section>
          <header>
            <nav>
              <HamburgerIcon />
              <article className="logo"> Banka</article>
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

export const mapDispatchToProps = dispatch => {
  return {
    fetchAccountsRequest: async token => {
      return dispatch(await fetchAccountsRequest(token));
    }
  };
};

export const mapStateToProps = state => {
  return {
    userAccounts: state.userAccounts
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Accounts);
