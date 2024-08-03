import AttrSelector from './AttrSelector.class.js'
import Cart from './Cart.class.js'
import Catalog from './Catalog.class.js'
import Filter from './Filter.class.js'
import Paginator from './Paginator.class.js'
import PriceRanger from './PriceRanger.class.js'
import Search from './Search.class.js'
import Sorter from './Sorter.class.js'



class Shop {
  constructor(api) {
    this.api = api
    this.ccy = undefined
    this.search = new Search()
    this.attrSelector = new AttrSelector()
    this.priceRanger = new PriceRanger()
    this.sorter = new Sorter()
    this.paginator = new Paginator()
    this.filter = new Filter()
    this.cart = new Cart()
    this.catalog = new Catalog(
      this.search,
      this.attrSelector,
      this.priceRanger,
      this.sorter,
      this.paginator
    )
  }

  async init() {
    const products = await this.api.loadProducts()
    const currencyRate = await this.api.loadCurrency()
    this.catalog.addProducts(products, currencyRate)
    this.filter.update(products)
    this.updateSearch()
  }

  updateSearch() {
    const captions = this.catalog.getCaptions()
    this.search.setPlaceholders(captions)
  }

  async updateCcy() {}
}
export default Shop
