class Favorite {
  constructor() {
    this.favorites = []
    this.counter = 0
  }
  calcCounter() {
    this.counter = this.products.length
  }

  addProductById(id) {
    const productToAdd = products.find(product => product.id === id)
    if (productToAdd) {
      this.favorites.push(productToAdd)
      this.calcCounter()
    }
  }

  updateProduct() {
    
  }

  removeProductById(id) {
    this.products = this.products.filter(product => product.id !== id)
    this.calcCounter()
  }
}
