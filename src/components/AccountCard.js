import React from 'react';
import PropTypes from 'prop-types';

const AccountCard = ({
  fullName,
  ownerEmail,
  accountNumber,
  status,
  balance,
  handleDelete,
  handleView
}) => {
  return (
    <>
      <article className="account-details">
        <article>
          <p>Fullname</p>
          <p>{fullName}</p>
        </article>
        <article>
          <p>Email</p>
          <p>{ownerEmail}</p>
        </article>
        <article>
          <p>Account Number</p>
          <p id="account-number">{accountNumber}</p>
        </article>
        <article>
          <p>Account Status</p>
          <p>{status}</p>
        </article>
        <article>
          <p>Account Balance</p>
          <p>&#8358; {balance}</p>
        </article>
        <article className="buttons">
          <a>
            <button id="view-account" onClick={handleView}>
              View Account
            </button>
          </a>
          <button id="delete-trigger" onClick={handleDelete} className="cancel">
            Delete Account
          </button>
        </article>
      </article>
    </>
  );
};
AccountCard.propTypes = {
  fullName: PropTypes.string.isRequired,
  accountNumber: PropTypes.number.isRequired,
  ownerEmail: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  balance: PropTypes.string.isRequired
};
export default AccountCard;
