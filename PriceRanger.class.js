class PriceRanger {
  constructor() {
    this.min = 0
    this.max = Infinity
    this.from = 0
    this.to = Infinity
  }

  calcMinMax(products) {
    const prices = products.map(product => product.convertedPrice)
    this.min = Math.floor(prices.length ? Math.min(...prices) : 2)
    this.max = Math.ceil(prices.length ? Math.max(...prices) : 3)
  },

  resetFromTo() {
    this.from = this.min
    this.to = this.max
  },

  setFrom(from) {
    this.from = from
  },

  setTo(to) {
    this.to = to
  },

  run(products) {
    return products.filter(
      product =>
        this.from <= product.convertedPrice &&
        product.convertedPrice <= this.to
    )
  },
}

module.exports = PriceRanger
