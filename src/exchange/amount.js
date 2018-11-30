class Amount
{
  constructor(value = '0.00')
  {
    this.value = value;
  }

  static fromString(value)
  {
    return new this(value);
  }
}

module.exports = Amount;
