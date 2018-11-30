const Exchange = require('./exchange');

class Service extends Exchange
{
  constructor(metadata, prices)
  {
    super(metadata, prices);
  }
}

module.exports = Service;
