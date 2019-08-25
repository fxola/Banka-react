import React from 'react';

const AccountModal = ({ handleChange, handleSubmit }) => {
  return (
    <article id="account-modal">
      <article className="account-modal-content" id="account-modal">
        <form onSubmit={handleSubmit} id="account-form">
          <article className="fields">
            <select
              required
              id="type"
              defaultValue="Select Account Type (savings or current)"
              name="type"
              onChange={handleChange}
            >
              <option disabled value="Select Account Type (savings or current)">
                Select Account Type (savings or current)
              </option>
              <option value="savings">savings</option>
              <option value="current">current</option>
            </select>
          </article>
          <button id="confirm" className="confirm" type="submit">
            Create Account
          </button>
        </form>
      </article>
    </article>
  );
};

export default AccountModal;
