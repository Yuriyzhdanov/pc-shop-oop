class Cart {
  constructor() {
    this.products = []
    this.count = 0
  }

  addProduct(product, count) {
    const cartProduct = this.products.find(
      prod => prod.product.id === product.id
    )
    if (cartProduct) {
      cartProduct += count
    } else {
      this.products.push({ product, count })
    }
  }

  removeProduct(productId) {
    this.products = this.products.filter(prod => prod.product.id !== productId)
  }

  clearCart() {
    this.products = []
  }
}

module.exports = Cart
