import React, { Component } from 'react';
import HamburgerIcon from '../components/HamburgerIcon';
import TransactionModal from '../components/TransactionModal';

import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { connect } from 'react-redux';
import {
  fetchAccountDetailsRequest,
  makeTransactionRequest
} from '../actions/staffActivityAction';
import { toast } from 'react-toastify';
import AccountDetailsCard from '../components/AccountDetailsCard';
import Modal from 'react-responsive-modal';
import Navigation from '../components/Navigation';

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
          <Navigation />
          <main id="accounts-main">
            <section id="accounts-section">
              {template}
              <Modal open={open} onClose={this.onCloseModal} center>
                <TransactionModal
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                />
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
