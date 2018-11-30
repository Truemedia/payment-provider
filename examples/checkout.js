const {
  Ledger, Transaction, TransactionLog, // Transaction
  Buyer, Seller, Broker, Parties, // Parties
  Amount, Currency, Price, Product, Service // Exchange
} = require('./../src/index');

/**
  * Currency
  */
let currency = new Currency('token');
/**
  * Offering (Products and/or services)
  */
let product = new Product({name: 'Test product'}, [
    new Price(currency, new Amount('12'))
  ]);
let service = new Service({name: 'Test service'}, [
    new Price(currency, new Amount('34'))
  ]);
/**
  * Balance (Buyers wallet)
  */
let balance = new Ledger(currency, [
  TransactionLog.income('UNIQUE_REF', [
    {
      prices: [{'token': 50}]
    }
  ])
]);
/**
  * Parties (Individuals/Groups involved)
  */
let parties = new Parties(
  new Buyer('John Doe', balance),
  new Seller('Retailer', new Ledger(currency)),
  new Broker('Affiliate', new Ledger(currency))
);
/**
  * Transaction (Sealing the deal)
  */
new Transaction(parties)
  .addProduct(product)
  .addService(service)
  .purchase(currency)
  .then(transaction => {
    console.log(`Buyer (${transaction.parties.buyer.alias}) balance`, transaction.parties.buyer.ledger.funds(currency));
    console.log(`Seller (${transaction.parties.seller.alias}) balance`, transaction.parties.seller.ledger.funds(currency));
  })
  .catch(msg => console.error(msg));
