const CheckedAttrs = require('./AttributesSelector.class')
const PriceRanger = require('./PriceRanger.class')
const Product = require('./Product.class')
const Search = require('./Search.class')

class Catalog {
  constructor() {
    this.products = []
  }

  computedProducts() {
    const searched = this.search.run(this.products)
    // const attributed = this.checkedAttrs.run(searched)
    // const priced = this.priceRanger.run(attributed)

    return searched
  }

  initSearch() {
    this.search = new Search(this.products)
  }

  initCheckedAttrs() {
    this.checkedAttrs = new CheckedAttrs()
  }

  initPriceRanger() {
    this.priceRanger = new PriceRanger()
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

module.exports = Catalog
