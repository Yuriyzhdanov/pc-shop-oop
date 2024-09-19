import { setWithLimits } from './utils.js'

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
    if (this.from === 0 && this.to === Infinity) {
      this.resetFromTo()
    }
    // if (this.from >= this.max && this.to > this.max) {

    // }
  }

  resetFromTo() {
    this.from = this.min
    this.to = this.max
  }

  setFrom(from) {
    this.from = setWithLimits(from, this.max, this.min)
    if (this.from > this.to) this.to = this.from
  }

  setTo(to) {
    this.to = setWithLimits(to, this.max, this.min)
    if (this.to < this.from) this.from = this.to
  }

  run(products) {
    this.calcMinMax(products)
    return products.filter(
      product =>
        this.from <= product.convertedPrice && product.convertedPrice <= this.to
    )
  }
}

export default PriceRanger
