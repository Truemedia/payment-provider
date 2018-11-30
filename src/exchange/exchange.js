class Exchange
{
  constructor(metadata = {}, prices = [])
  {
    this.metadata = metadata;
    this.prices = prices;
  }
}

module.exports = Exchange;
