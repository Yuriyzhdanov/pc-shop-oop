class Product {
  constructor(options) {
    this.id = options.id
    this.caption = options.caption
    this.price = options.price
    this.convertedPrice = undefined
    this.attributes = options.attributes
    this.photos = options.photos
    
  }

  convertPrice(currencyRate) {
    this.convertedPrice = this.price * currencyRate
  }
}

export default Product
