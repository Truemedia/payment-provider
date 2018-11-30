module.exports = class LackOfFundsError extends Error {
  constructor (message = 'Lack of available funds', status) {
    super(message);
    this.code = 'PAYMENT_LACK_OF_FUNDS';
    Error.captureStackTrace(this, this.constructor);
    this.status = status || 500;
  }
};
