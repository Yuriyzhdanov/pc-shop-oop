const Product = require('./Product.class')
const Filter = require('./Filter.class')


class Catalog {
  constructor() {
    this.products = []
    this.filter = new Filter()
  }

  addProducts(products) {
    products.forEach(this.addProduct.bind(this))
  }

  addProduct(product) {
    const createdProduct = new Product(product)
    this.products.push(createdProduct)
  }

  getProductById(id) {
    return this.products.find(product => product.id === id)
  }

  // computedProducts() {

  // }

  clear() {
    this.products = []
  }
}

module.exports = Catalog
