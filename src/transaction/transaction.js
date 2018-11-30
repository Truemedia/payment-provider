const Accumulator = require('./accumulator');
const Receipt = require('./receipt');
const Sale = require('./sale');
const TransactionLog = require('./transaction_log');
const LackOfFundsError = require('./../errors/lack_of_funds');

class Transaction
{
  constructor(parties, ref = null)
  {
    this.parties = parties;
    this.offering = [];
    this.ref = null;
  }

  get buyer()
  {
    return this.parties.buyer;
  }

  /**
    * Add product to offering
    * @return {this}
    */
  addProduct(product)
  {
    this.addToExchange(product);
    return this;
  }

  /**
    * Add products to offering
    * @return {this}
    */
  addProducts(products)
  {
    products.map(product => this.addToExchange(product));
    return this;
  }

  /**
    * Add service to offering
    */
  addService(service)
  {
    this.addToExchange(service);
    return this;
  }

  /**
    * Add services to offering
    */
  addServices(services)
  {
    services.map(service => this.addToExchange(service));
    return this;
  }

  addToExchange(offer)
  {
    this.offering.push(offer);
  }

  /**
    * Collect quote for prices on relevant currency
    * @return {Int}
    */
  quote(currency)
  {
    return new Accumulator(this.offering).total(currency);
  }

  /**
    * Check if party has funds
    * @return {Bool}
    */
  hasFunds(currency, amount, party = 'buyer')
  {
    return this.parties[party].ledger.funds(currency) >= amount;
  }

  /**
    * Transfer from one party to another
    * return {Promise}
    */
  transfer(currency, amount, sender = 'buyer', recipient = 'seller')
  {
    return new Promise( (resolve, reject) => {
      if (this.hasFunds(currency, amount, sender)) {
        resolve( this.authorise(currency, amount, sender, recipient) );
      } else {
        reject(new LackOfFundsError);
      }
    });
  }

  /**
    * Authorise/run transaction
    * @return {this}
    */
  authorise(currency, amount, sender = 'buyer', recipient = 'seller')
  {
    this.generateRef();
    if (recipient == 'seller') {
      this.parties[recipient].completeTransaction( Sale.fromTransaction(this) );
    }
    this.parties['buyer'].completeTransaction( Receipt.fromTransaction(this) );
    return this;
  }

  /**
    * Buyer purchase from seller
    * @return {Promise}
    */
  purchase(currency)
  {
    return this.transfer(currency, this.quote(currency));
  }

  /**
    * Seller refund buyer
    */
  refund(currency)
  {
    this.transfer(currency, this.quote(currency), 'seller', 'buyer');
  }

  generateRef()
  {
    this.ref = 'UNIQUE_REF'; // TODO: Replace with actual ref generator
  }
}

module.exports = Transaction;
