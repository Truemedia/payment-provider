const TransactionLog = require('./transaction_log');

class Receipt extends TransactionLog
{
  static fromTransaction(transaction)
  {
    let {uuid, data} = this.dataFromTransaction(transaction);
    return new this(uuid, 'outcome', data);
  }
}

module.exports = Receipt;
