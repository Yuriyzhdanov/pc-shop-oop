class Product {
  constructor(options, api) {
    this.api = api
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
    this.api.addToFavorites(this.id)
  }

  removeFromFavorites() {
    this.isFavorite = false
    this.api.removeFromFavorites(this.id)
  }
}

export default Product
