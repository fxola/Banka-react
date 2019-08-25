import React from 'react';

const TransactionModal = ({ handleChange, handleSubmit }) => {
  return (
    <>
      <article id="transaction-modal">
        <article className="transaction-modal-content" id="transaction-modal">
          <form onSubmit={handleSubmit} id="transaction-form">
            <article className="fields">
              <select
                name="type"
                onChange={handleChange}
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
                onChange={handleChange}
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
    </>
  );
};

export default TransactionModal;
