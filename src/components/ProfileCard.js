import React from 'react';

const ProfileCard = ({
  fullname,
  accountNumber,
  balance,
  status,
  email,
  image,
  type
}) => {
  return (
    <section id="profile">
      <article id="photo">
        <article className="card-img">
          <img
            src="https://res.cloudinary.com/fxola/image/upload/v1562711912/ezkc4mj7pktwzqhmrbpt.png"
            alt="profile photo"
          />
        </article>
        <article className="container">
          <p>{fullname}</p>
        </article>
      </article>
      <article className="details">
        <article>
          <p>Account Number</p>
          <p className="account-number">{accountNumber}</p>
        </article>
        <article>
          <p>Account Balance</p>
          <p className="account-balance">&#8358;{balance ? balance : 0.0}</p>
        </article>
        <article>
          <p>Account Type</p>
          <p className="account-number">{type}</p>
        </article>
        <article>
          <p>Account Status</p>
          <p className="account-status">{status}</p>
        </article>
        <article>
          <p>Email Address</p>
          <p className="account-number">{email}</p>
        </article>
      </article>
    </section>
  );
};

export default ProfileCard;
