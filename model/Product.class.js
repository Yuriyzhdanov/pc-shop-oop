class Product {
  constructor(options) {
    this.id = options.id
    this.caption = options.caption
    this.price = options.price
    this.convertedPrice = options.convertedPrice
    this.attributes = options.attributes
  }
}

module.exports = Product
