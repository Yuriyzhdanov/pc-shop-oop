const AttrSelector = require('./AttrSelector.class')
const PriceRanger = require('./PriceRanger.class')
const Search = require('./Search.class')
const Filter = require('./Filter.class')
const Sorter = require('./Sorter.class')
const Paginator = require('./Paginator.class')
const Cart = require('./Cart.class')


class Shop {
  constructor() {
    this.products = [];
    this.initSearch();
    this.initCheckedAttrs();
    this.initPriceRanger();
    this.initSorter();
    this.initPaginator();
    this.initCart();
    this.initFilter();
  }

  computeProducts() {
    const searched = this.search.run(this.products)
    const attributed = this.attrSelector.run(searched)
    const priced = this.priceRanger.run(attributed)
    const sorted = this.sorter.run(priced)
    return this.paginator.run(sorted)
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
}

module.exports = Shop
