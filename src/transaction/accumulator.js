class Accumulator
{
  constructor(payload)
  {
    this.payload = payload;
  }

  /**
    * Consolidate prices
    */
  get prices()
  {
    return Accumulator.derivePrices(this.payload);
  }

  /**
    * Derive prices
    */
  static derivePrices(payload)
  {
    let prices = {};

    payload.map(entry => {
      return entry.prices.map(price => {
        if (prices[price.currency.symbol] == undefined) {
          prices[price.currency.symbol] = [];
        }
        prices[price.currency.symbol].push(price.amount.value);
      });
    });

    return prices;
  }

  /**
    * Total for a currency
    */
  total(currency)
  {
    // TODO: Use BigInt
    return parseInt( this.prices[currency.symbol].reduce( (total, price) => total += parseInt(price), 0) );
  }
}

module.exports = Accumulator;
