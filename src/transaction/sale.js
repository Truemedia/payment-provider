const TransactionLog = require('./transaction_log');

class Sale extends TransactionLog
{
  static fromTransaction(transaction)
  {
    let {uuid, data} = this.dataFromTransaction(transaction);
    return new this(uuid, 'income', data);
  }
}

module.exports = Sale;
