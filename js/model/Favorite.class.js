export default class Favorite {
  constructor() {
    this.products = []
    this.counter = 0
  }
  calcCounter() {
    this.counter = this.products.length
  }

  addProduct(product) {
    this.products.push(product)
    this.calcCounter()
  }
  // addProductById(id) {
  //   const productToAdd = products.find(product => product.id === id)
  //   if (productToAdd) {
  //     this.products.push(productToAdd)
  //     this.calcCounter()
  //   }
  // }

  updateProduct() {
    //api
  }

  removeProductById(id) {
    this.products = this.products.filter(product => product.id !== id)
    this.calcCounter()
  }
}

