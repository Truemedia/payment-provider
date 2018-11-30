const Exchange = require('./exchange');

class Product extends Exchange
{
  constructor(metadata, prices)
  {
    super(metadata, prices);
  }
}

module.exports = Product;
