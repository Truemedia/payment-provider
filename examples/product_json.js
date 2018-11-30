const {Product} = require('./../src/index');

let res = {
  data: {
    name: 'Test product',
    prices: [
      {
        currency: 'token',
        amount: 12
      }
    ]
  }
};

let product = Product.fromJson(res.data);
console.log('product', product);
