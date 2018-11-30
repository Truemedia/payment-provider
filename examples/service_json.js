const {Service} = require('./../src/index');

let res = {
  data: {
    name: 'Test Service',
    prices: [
      {
        currency: 'token',
        amount: 34
      }
    ]
  }
};

let service = Service.fromJson(res.data);
console.log('service', service);
