const Product = require('./Product.class')
const AttrSelector = require('./AttrSelector.class')
const PriceRanger = require('./PriceRanger.class')
const Search = require('./Search.class')
const Filter = require('./Filter.class')
const Sorter = require('./Sorter.class')
const Paginator = require('./Paginator.class')
const Cart = require('./Cart.class')

class Catalog {
  constructor() {
    this.products = []
  }

  computedProducts() {
    const searched = this.search.run(this.products)
    const attributed = this.attrSelector.run(searched)
    const priced = this.priceRanger.run(attributed)
    const sorted = this.sorter.run(priced)
    return this.paginator.run(sorted)
    // const filtered = this.filter.run(priced)
  }

  initSearch() {
    const captions = this.products.map(product => product.caption)
    this.search = new Search(captions)
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

  initPaginator() {
    this.paginator = new Paginator()
  }

  initCart() {
    this.cart = new Cart()
  }

  initFilter() {
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

  clear() {
    this.products = []
  }
}

module.exports = Catalog
