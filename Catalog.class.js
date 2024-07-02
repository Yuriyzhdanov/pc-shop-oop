const Product = require('./Product.class')
const AttrSelector = require('./AttrSelector.class')
const PriceRanger = require('./PriceRanger.class')
const Search = require('./Search.class')
const Sorter = require('./Sorter.class')

class Catalog {
  constructor() {
    this.products = []
  }

  computedProducts() {
    const searched = this.search.run(this.products)
    const attributed = this.attrSelector.run(searched)
    const priced = this.priceRanger.run(attributed)
    const sorted = this.sorter.run(priced)
    return sorted
  }

  initSearch() {
    this.search = new Search(this.products)
  }

  initCheckedAttrs() {
    this.attrSelector = new AttrSelector()
  }

  initPriceRanger() {
    this.priceRanger = new PriceRanger()
  }

  initSorter() {
    this.sorter = new Sorter()
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
