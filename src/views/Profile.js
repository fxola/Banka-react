import React, { Component } from 'react';
import HamburgerIcon from '../components/HamburgerIcon';

import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import {
  createAccountRequest,
  fetchClientAccountRequest
} from '../actions/clientActivityAction';
import Modal from 'react-responsive-modal';
import ProfileCard from '../components/ProfileCard';
import AccountModal from '../components/AccountModal';
import Navigation from '../components/Navigation';

class Profile extends Component {
  state = {
    open: false,
    email: '',
    fullName: '',
    type: ''
  };

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.props.fetchClientAccountRequest(user.email, user.token);
    this.setState({
      token: user.token,
      email: user.email,
      fullName: `${user.firstName} ${user.lastName}`
    });
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
    if (this.state.type === '') {
      toast.error('Please make a selection');
      return;
    }
    await this.props.createAccountRequest(this.state.type, this.state.token);
    toast.success(this.props.userDetails.newBankAccount.message);
    this.onCloseModal();
  };

  render() {
    const { open, email, fullName } = this.state;
    let balance, status, accountNumber, type;
    let createAccountButton = (
      <button onClick={this.onOpenModal} type="submit">
        Create Bank Account
      </button>
    );
    if (Object.keys(this.props.userDetails).length > 0) {
      const { newBankAccount, existingBankAccount } = this.props.userDetails;
      if (
        existingBankAccount &&
        !Object.keys(existingBankAccount).includes('error')
      ) {
        balance = existingBankAccount.balance;
        status = existingBankAccount.status;
        accountNumber = existingBankAccount.accountNumber;
        type = existingBankAccount.type;
        createAccountButton = null;
      } else {
        balance = newBankAccount && newBankAccount.data.balance;
        status = newBankAccount && newBankAccount.data.status;
        accountNumber = newBankAccount && newBankAccount.data.accountNumber;
        type = newBankAccount && newBankAccount.data.type;
      }
      if (newBankAccount) createAccountButton = null;
    }

    return (
      <section>
        <Navigation />
        <main id="dashboard-main">
          <section id="dashboard-section">
            {this.props.userDetails.isLoading ? (
              <mark>
                <h1>Loading..</h1>
              </mark>
            ) : (
              <>
                <ProfileCard
                  email={email}
                  fullname={fullName}
                  balance={balance}
                  status={status}
                  accountNumber={accountNumber}
                  type={type}
                />
                <section id="account">{createAccountButton}</section>
                <Modal open={open} onClose={this.onCloseModal} center>
                  <AccountModal
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                  />
                </Modal>
              </>
            )}
          </section>
        </main>
        <Footer />
      </section>
    );
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    createAccountRequest: async (type, token) => {
      return dispatch(await createAccountRequest(type, token));
    },
    fetchClientAccountRequest: async (email, token) => {
      return dispatch(await fetchClientAccountRequest(email, token));
    }
  };
};

export const mapStateToProps = state => {
  return {
    userDetails: state.userDetails
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
