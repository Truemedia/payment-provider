class Parties
{
  constructor(buyer, seller, broker = null)
  {
    this.buyer = buyer;
    this.seller = seller;
    this.broker = broker;
  }
}

module.exports = Parties;
