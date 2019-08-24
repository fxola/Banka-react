import React from 'react';
const AccountDetailsCard = ({
  fullName,
  accountNumber,
  status,
  balance,
  handleTransaction
}) => {
  return (
    <article className="account-record">
      <article className="record-details">
        <figure>
          <img
            height="100px"
            width="100px"
            src="https://res.cloudinary.com/fxola/image/upload/v1562711912/ezkc4mj7pktwzqhmrbpt.png"
            alt="profile photo"
          />
        </figure>
        <article>
          <p>Fullname</p>
          <p>{fullName}</p>
        </article>
        <article>
          <p>Account Number</p>
          <p>{accountNumber}</p>
        </article>
        <article>
          <p>Account Status</p>
          <p>{status}</p>
        </article>
        <article>
          <p>Account Balance</p>
          <p>&#8358;{balance} </p>
        </article>
      </article>
      <article className="actions">
        <h1>Actions</h1>
        <article className="action-buttons">
          <button onClick={() => handleTransaction()}>Make Transaction</button>
          <button className="activate">Activate</button>
          <button className="cancel">Deactivate</button>
        </article>
      </article>
    </article>
  );
};
export default AccountDetailsCard;
