const Currency = require('./currency');
const Amount = require('./amount');

class Price
{
  constructor(currency, amount)
  {
    this.currency = currency;
    this.amount = amount;
  }

  static fromJson(data)
  {
    let {currency, amount} = data;
    return new this(
      Currency.fromString(currency), Amount.fromString(amount)
    );
  }
}

module.exports = Price;
