const Party = require('./party');

class Broker extends Party
{
  constructor(alias, ledger)
  {
    super(alias, ledger);
    this.type = 'broker';
  }
}

module.exports = Broker;
