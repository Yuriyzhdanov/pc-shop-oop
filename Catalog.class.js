const CheckedAttrs = require('./CheckedAttrs.class')
const Product = require('./Product.class')
const Search = require('./Search.class')

class Catalog {
  constructor() {
    this.products = []
  }

  computedProducts() {
    const searched = this.search.run(this.products)
    console.log(searched)
    const attributed = this.checkedAttrs.run(searched)

    return attributed
  }

  initCheckedAttrs() {
    this.checkedAttrs = new CheckedAttrs()
  }

  initSearch() {
    const placeholders = this.products.map(product => product.caption)
    this.search = new Search(placeholders, this.products)
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

  clear() {
    this.products = []
  }
}
console.log('hello');

module.exports = Catalog
