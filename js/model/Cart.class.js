import api from '../api/api.js'

class Cart {
  constructor() {
    this.products = []
    this.counter = 0
  }

  async getProductFromCart() {
    this.products = await api.getCartProducts()
    this.calcCounter()
    return this.products
  }

  async addProductToCart(productId) {
    await api.addProductToCart(productId)
    const product = await api.loadProductById(productId)
    this.addProduct(product)
  }

  async removeProductFromCart(productId) {
    await api.removeProductFromCart(productId)
    this.removeProduct(productId)
  }

  async clearCart() {
    await api.clearCart()
    this.clearCart()
  }

  addProduct(product) {
    this.products.push(product)
    this.calcCounter()
  }

  removeProduct(id) {
    this.products = this.products.filter(product => product.id !== id)
    this.calcCounter()
  }

  clearCart() {
    this.products = []
    this.calcCounter()
  }

  calcCounter() {
    this.counter = this.products.length
  }
}

export default Cart
