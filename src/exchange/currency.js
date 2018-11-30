class Currency
{
  constructor(symbol)
  {
    this.symbol = symbol;
  }

  static fromString(symbol)
  {
    return new this(symbol);
  }
}

module.exports = Currency;
