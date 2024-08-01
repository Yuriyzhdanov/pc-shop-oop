class Product {
  constructor(options) {
    this.id = options.id
    this.caption = options.caption
    this.price = options.price
    this.convertedPrice = options.convertedPrice
    this.attributes = options.attributes
  }



  convertPrice(???) {
    this.convertedPrice = product.price * this.currencyUSD
  }
}

export default Product
