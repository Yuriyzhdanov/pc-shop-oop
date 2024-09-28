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
    this.isInCart = false
  }

  convertPrice(currencyRate) {
    this.convertedPrice = this.price * currencyRate
    this.convertedPrice = +this.convertedPrice.toFixed(0)
  }

  async toggleFavorite() {
    if (this.isFavorite) {
      await this.removeFromFavorites()
    } else {
      await this.addToFavorites()
    }
  }

  async toggleInCart() {
    if (this.isInCart) {
      await this.removeFromCart()
    } else {
      await this.addToCart()
    }
  }

  async addToFavorites() {
    const postedFavorite = await this.api.postToFavorites(this.id)
    if (postedFavorite.productId === this.id) {
      this.isFavorite = true
    }
  }

  async addToCart() {
    const postedInCart = await this.api.postProductToCart(this.id)
    if (postedInCart.productId === this.id) {
      this.isInCart = true
    }
  }

  async removeFromFavorites() {
    await this.api.deleteFromFavorites(this.id)
    this.isFavorite = false
  }

  async removeFromCart() {
    await this.api.deleteProductFromCart(this.id)
    this.isInCart = false
  }
}

export default Product
