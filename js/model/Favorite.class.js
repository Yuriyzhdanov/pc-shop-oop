class Favorite {
  constructor() {
    this.products = []
    this.counter = 0
    this.allProducts = []
  }

  calcCounter() {
    this.counter = this.products.length
  }

  setAllProducts(products) {
    this.allProducts = products
  }

  addProductById(id) {
    const productToAdd = this.allProducts.find(product => product.id === id)
    if (productToAdd && !this.products.some(product => product.id === id)) {
      this.products.push(productToAdd)
      this.calcCounter()
    }
  }

  updateProduct(id) {
    const index = this.products.findIndex(product => product.id === id)
    console.log('index', index)
  }

  removeProductById(id) {
    this.products = this.products.filter(product => product.id !== id)
    this.calcCounter()
  }
}

export default Favorite
