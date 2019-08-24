import React, { Component } from 'react';
import HamburgerIcon from '../components/HamburgerIcon';

import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { connect } from 'react-redux';
import {
  fetchAccountsRequest,
  fetchAccountDetailsRequest
} from '../actions/fetchAccountsAction';
import { toast } from 'react-toastify';
import AccountDetailsCard from '../components/AccountDetailsCard';
import Modal from 'react-responsive-modal';

export class SingleAccount extends Component {
  state = {
    open: false
  };

  async componentDidMount() {
    const { accountNumber } = this.props.match.params;
    this.props.fetchAccountDetailsRequest(accountNumber);
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    const { open } = this.state;
    let template = <mark>Loading...</mark>;
    if (this.props.userAccounts.singleAccount) {
      const {
        fullName,
        balance,
        status,
        accountNumber
      } = this.props.userAccounts.singleAccount;
      template = (
        <AccountDetailsCard
          fullName={fullName}
          balance={balance}
          status={status}
          accountNumber={accountNumber}
          handleTransaction={this.onOpenModal}
        />
      );
    }

    return (
      <>
        <section>
          <header>
            <nav>
              <HamburgerIcon />
              <article className="logo"> Banka</article>
              <article className="menu">
                <ul>
                  <Link to="/accounts">
                    <li>Accounts</li>
                  </Link>
                  <Link to="/">
                    <li>Log Out</li>
                  </Link>
                </ul>
              </article>
            </nav>
          </header>
          <main id="accounts-main">
            <section id="accounts-section">
              {template}
              <Modal
                open={open}
                onClose={this.onCloseModal}
                center
                className="tx-modal"
              >
                <article id="transaction-modal">
                  <article
                    className="transaction-modal-content"
                    id="transaction-modal"
                  >
                    <form onSubmit={this.handleSubmit} id="transaction-form">
                      <article className="fields">
                        <select
                          required
                          id="transaction-type"
                          placeholder="Select Transaction Type (credit or debit)"
                        >
                          <option value="credit">credit</option>
                          <option value="debit">debit</option>
                        </select>
                        <input
                          type="number"
                          id="amount"
                          placeholder="Transaction Amount"
                        />
                      </article>
                      <button className="confirm" id="confirm">
                        Make Transaction
                      </button>
                    </form>
                  </article>
                </article>
              </Modal>
            </section>
          </main>
          <Footer />
        </section>
      </>
    );
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    fetchAccountDetailsRequest: async token => {
      return dispatch(await fetchAccountDetailsRequest(token));
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
)(SingleAccount);
