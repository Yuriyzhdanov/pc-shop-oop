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
    this.favoritesCount = 0
  }

  convertPrice(currencyRate) {
    this.convertedPrice = this.price * currencyRate
    this.convertedPrice = +this.convertedPrice.toFixed(0)
  }

  async addToFavorites() {
    const postedFavorite = await this.api.postToFavorites(this.id)
    console.log('postedFavorite', postedFavorite)

    if (postedFavorite.productId === this.id) {
      console.log('ok!', this.id)
      this.isFavorite = true
      this.favoritesCount++
      console.log('+', this.favoritesCount)
    }
  }

  removeFromFavorites() {
    this.isFavorite = false
    this.api.deleteFromFavorites(this.id)
    this.favoritesCount--
    console.log('-', this.favoritesCount)
  }
}

export default Product
