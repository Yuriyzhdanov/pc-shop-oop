class Product {
  constructor(options) {
    this.id = options.id
    this.caption = options.caption
    this.price = options.price
    this.attributes = options.attributes
  }
}

module.exports = Product
console.log('hello');
