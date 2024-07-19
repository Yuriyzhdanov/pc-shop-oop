const AttrSelector = require('./AttrSelector.class')
const PriceRanger = require('./PriceRanger.class')
const Search = require('./Search.class')
const Filter = require('./Filter.class')
const Sorter = require('./Sorter.class')
const Paginator = require('./Paginator.class')
const Cart = require('./Cart.class')
const Catalog = require('./Catalog.class')

class Shop {
  constructor(api) {
    this.api = api
    this.catalog = new Catalog(
      this.search,
      this.attrSelector,
      this.priceRanger,
      this.sorter,
      this.paginator
    )
    this.search = new Search()
    this.attrSelector = new AttrSelector()
    this.priceRanger = new PriceRanger()
    this.sorter = new Sorter()
    this.paginator = new Paginator()
    this.filter = new Filter()
    this.cart = new Cart()
  }

  async updateCatalog() {
    const products = await this.api.loadProducts()
    this.catalog.addProducts(products)
    this.updateSearch()
  }

  updateSearch() {
    const captions = this.catalog.getCaptions()
    this.search.setPlaceholders(captions)
  }
}

module.exports = Shop
