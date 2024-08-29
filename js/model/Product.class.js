class Product {
  constructor(options) {
    this.id = options.id
    this.caption = options.caption
    this.price = options.price
    this.convertedPrice = undefined
    this.attributes = options.attributes
    this.photos = options.photos
    this.isFavorite = false
  }

  convertPrice(currencyRate) {
    this.convertedPrice = this.price * currencyRate
    this.convertedPrice = +this.convertedPrice.toFixed(0)
  }

  addToFavorites() {
    this.isFavorite = true
  }

  removeFromFavorites() {
    this.isFavorite = false
  }
}

export default Product
