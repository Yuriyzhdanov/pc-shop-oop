class Cart {
  constructor() {
    this.products = []
    this.counter = 0
  }

  addProduct(product) {
    this.products.push(product)
    this.calcCounter()
  }

  removeProduct(id) {
    this.products = this.products.filter(product => product.id !== id)
  }

  clearCart() {
    this.products = []
  }

  calcCounter() {
    this.counter = this.products.length
  }
}

export default Cart
