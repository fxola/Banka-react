import React, { Component } from 'react';
import HamburgerIcon from '../components/HamburgerIcon';

import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { connect } from 'react-redux';
import {
  fetchAccountDetailsRequest,
  makeTransactionRequest
} from '../actions/fetchAccountsAction';
import { toast } from 'react-toastify';
import AccountDetailsCard from '../components/AccountDetailsCard';
import Modal from 'react-responsive-modal';

export class SingleAccount extends Component {
  state = {
    open: false,
    type: '',
    amount: ''
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

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { accountNumber } = this.props.match.params;
    if (this.state.type === '') {
      toast.error('Please make a selection');
      return;
    }

    await this.props.makeTransactionRequest(this.state, accountNumber);
    this.onCloseModal();
  };

  componentDidUpdate() {
    const { singleAccount } = this.props.userAccounts;
    if (
      singleAccount &&
      singleAccount.transaction &&
      singleAccount.transaction.message
    ) {
      singleAccount.transaction.status
        ? toast.success(singleAccount.transaction.message)
        : toast.error(singleAccount.transaction.message);
    }
  }

  render() {
    const { open } = this.state;

    let template = <mark>Loading...</mark>;
    if (this.props.userAccounts.singleAccount) {
      const {
        fullName,
        balance,
        transaction,
        status,
        accountNumber
      } = this.props.userAccounts.singleAccount;
      let accountBalance = balance;
      if (transaction && transaction.data) {
        accountBalance = transaction.data.accountBalance;
      }

      template = (
        <AccountDetailsCard
          fullName={fullName}
          balance={accountBalance}
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
                          name="type"
                          onChange={this.handleChange}
                          required
                          id="transaction-type"
                          defaultValue="Select Transaction Type (credit or debit)"
                        >
                          <option
                            disabled
                            value="Select Transaction Type (credit or debit)"
                          >
                            Select Transaction Type (credit or debit)
                          </option>
                          <option value="credit">credit</option>
                          <option value="debit">debit</option>
                        </select>
                        <input
                          type="number"
                          id="amount"
                          name="amount"
                          onChange={this.handleChange}
                          placeholder="Transaction Amount"
                          required
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
    },
    makeTransactionRequest: async (payload, accountNumber) => {
      return dispatch(await makeTransactionRequest(payload, accountNumber));
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
