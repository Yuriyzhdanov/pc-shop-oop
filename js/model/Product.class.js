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

  async postToFavorites() {
    const postedFavorite = await this.api.postToFavorites(this.id)
    if (postedFavorite.productId === this.id) {
      console.log('ok!', this.id)
      this.isFavorite = true
    }
  }

  deleteFromFavorites() {
    this.isFavorite = false
    this.api.deleteFromFavorites(this.id)
  }
}

export default Product

// modelShop.api
//   .postToFavorites(36)
//   .then(d => d.productId === 36 && console.log('ok!'))
