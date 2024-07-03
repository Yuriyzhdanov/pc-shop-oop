const Product = require('./Product.class')
const AttrSelector = require('./AttrSelector.class')
const PriceRanger = require('./PriceRanger.class')
const Search = require('./Search.class')
const Filter = require('./Filter.class')
const Sorter = require('./Sorter.class')
const Paginator = require('./Paginator.class')

class Catalog {
  constructor() {
    this.products = []
  }

  computedProducts(currentPage) {
    const searched = this.search.run(this.products)
    const attributed = this.attrSelector.run(searched)
    const priced = this.priceRanger.run(attributed)
    const filtered = this.filter.run(priced)
    const sorted = this.sorter.run(filtered)
    const paginated = this.paginator.run(currentPage, sorted)
    return paginated
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

  initFilter() {
    this.filter = new Filter()
  }

  initSorter() {
    this.sorter = new Sorter()
  }

  initPaginator(perCountPages) {
    this.paginator = new Paginator(perCountPages)
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
