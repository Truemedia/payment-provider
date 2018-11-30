const Price = require('./price');

class Exchange
{
  constructor(metadata = {}, prices = [])
  {
    this.metadata = metadata;
    this.prices = prices;
  }

  static fromJson(data)
  {
    let {name, prices} = data;
    return new this({name}, prices.map(price => Price.fromJson(price)));
  }
}

module.exports = Exchange;
