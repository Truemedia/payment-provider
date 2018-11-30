class Party
{
  constructor(alias, ledger = null)
  {
    this.alias = alias;
    this.ledger = ledger;
    this.type = null;
  }

  /**
    * Complete/record a transaction
    */
  completeTransaction(transactionLog)
  {
    this.ledger.addTransaction(transactionLog);
  }
}

module.exports = Party;
