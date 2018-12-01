const {
  Ledger, Transaction, TransactionLog, // Transaction
  Buyer, Seller, Broker, Parties, // Parties
  Amount, Currency, Price, Product, Service // Exchange
} = require('./../src/index');

// User with a balannce of 40 tokens trys to buy a product and service with a total cost of 46 tokens

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
      prices: [{'token': 40}]
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
let transaction = new Transaction(parties)
  .addProduct(product)
  .addService(service);

transaction.purchase(currency)
  .then(transaction => {
    console.log(`Buyer (${transaction.parties.buyer.alias}) balance`, transaction.parties.buyer.ledger.funds(currency));
    console.log(`Seller (${transaction.parties.seller.alias}) balance`, transaction.parties.seller.ledger.funds(currency));
  })
  .catch(err => {
    switch (err.code) {
      case 'PAYMENT_LACK_OF_FUNDS':
        let quote = transaction.quote(currency);
        let fundsNeeded = transaction.fundsNeeded(currency);
        console.log(`Cost of offering is ${quote}, buyer needs ${fundsNeeded} more to afford it`);
      break;
      default:
        console.error(msg)
      break;
    }
  });
