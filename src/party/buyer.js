const Party = require('./party');

class Buyer extends Party
{
  constructor(alias, ledger)
  {
    super(alias, ledger);
    this.type = 'buyer';
  }
}

module.exports = Buyer;
