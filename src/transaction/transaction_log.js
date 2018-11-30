const Amount = require('./../exchange/amount');
const Currency = require('./../exchange/currency');
const Price = require('./../exchange/price');

class TransactionLog
{
  constructor(uuid, type, data)
  {
    this.uuid = uuid;
    this.type = type;
    this.data = data;
  }

  static income(uuid, data)
  {
    return new this(uuid, 'income', data);
  }

  static outcome(uuid, data)
  {
    return new this(uuid, 'outcome', data);
  }

  static dataFromTransaction(transaction)
  {
    let uuid = transaction.ref;
    let data = transaction.offering.map(entry => {
      return {prices: entry.prices.map(price => {
        return {[price.currency.symbol]: price.amount.value};
      })};
    });
    return {uuid, data};
  }

  get payload()
  {
    return this.data.map(entry => {
      return {prices: entry.prices.map( (price) => {
        let [kvp] = Object.entries(price);
        let [currency, amount] = kvp;
        return new Price(new Currency(currency), new Amount(amount));
      })};
    });
  }
}

module.exports = TransactionLog;
