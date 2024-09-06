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

  async addToFavorites() {
    const postedFavorite = await this.api.postToFavorites(this.id)
    if (postedFavorite.productId === this.id) {
      console.log('ok!', this.id)
      this.isFavorite = true
    }
  }

  async removeFromFavorites() {
    await this.api.deleteFromFavorites(this.id)
    this.isFavorite = false
  }
}

export default Product
