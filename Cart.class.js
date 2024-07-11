class Cart {
  constructor() {
    this.products = []
  }

  addProduct(product) {
    this.products.push(product)
  }

  removeProduct(productId) {
    this.products = this.products.filter(prod => prod.id !== productId)
  }

  clearCart() {
    this.products = []
  }
}

module.exports = Cart
