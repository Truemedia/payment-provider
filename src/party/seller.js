const Party = require('./party');

class Seller extends Party
{
  constructor(alias, ledger)
  {
    super(alias, ledger);
    this.type = 'seller';
  }
}

module.exports = Seller;
