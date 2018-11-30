const Accumulator = require('./accumulator');

class Ledger
{
  constructor(currency, transactions = [])
  {
    this.preferredCurrency = currency;
    this.transactions = transactions;
  }

  /**
    * All transactions classified as income
    */
  get revenue()
  {
    return this.transactions.filter(transaction => transaction.type == 'income');
  }

  /**
    * All transactions classified as outcome
    */
  get outgoings()
  {
    return this.transactions.filter(transaction => transaction.type == 'outcome');
  }

  get totalRevenue()
  {
    return this.total(this.revenue);
  }

  get totalOutgoings()
  {
    return this.total(this.outgoings);
  }

  funds(currency = null)
  {
    if (currency != null) {
      this.currency = currency;
    }
    return (this.totalRevenue - this.totalOutgoings);
  }

  set currency(currency)
  {
    this.preferredCurrency = currency;
  }

  total(transactions)
  {
    let total = 0;
    total += transactions.map(transaction => {
      return new Accumulator(transaction.payload).total(this.preferredCurrency);
    });

    return parseInt(total);
  }

  addTransaction(transaction)
  {
    this.transactions.push(transaction);
  }
}

module.exports = Ledger;
