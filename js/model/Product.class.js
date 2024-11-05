class Product {
  constructor(options, api) {
    this.api = api
    this.id = options.id
    this.caption = options.caption
    this.price = options.price
    this.convertedPrice = undefined
    this.attributes = options.attributes
    this.photos = options.photos
    this.isFavorite = options.isFavorite || false
    this.isInCart = options.isInCart || false
    this.isInCompare = options.isInCompare || false
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
      await this.removeProductFromCart()
    } else {
      await this.addToCart()
    }
  }

  async toggleInCompare() {
    if (this.isInCompare) {
      await this.removeProductFromCompare()
    } else {
      await this.addToCompare()
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
    console.log(postedInCart)

    if (postedInCart.productId === this.id) {
      this.isInCart = true
    }
  }

  async addToCompare() {
    const postedInCompare = await this.api.postProductToCompare(this.id)
    if (postedInCompare.productId === this.id) {
      this.isInCompare = true
    }
  }

  async removeFromFavorites() {
    await this.api.deleteFromFavorites(this.id)
    this.isFavorite = false
  }

  async removeProductFromCart() {
    await this.api.deleteProductFromCart(this.id)
    this.isInCart = false
  }

  async removeProductFromCompare() {
    await this.api.deleteProductFromCompare(this.id)
    this.isInCompare = false
  }
}

export default Product
