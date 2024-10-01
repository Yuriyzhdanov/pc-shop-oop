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
    await this.api.authenticate()
    const currencyRate = await this.api.loadCurrency()
    const favoriteObjs = await this.api.getFavoriteProducts(this.userId)
    const favoriteIds = favoriteObjs.map(fo => fo.productId)
    const inCartObjs = await this.api.getCartProducts(this.userId)
    const inCartIds = inCartObjs.map(fo => fo.productId)
    const compareObjs = await this.api.getCompareProducts(this.userId)
    const compareIds = compareObjs.map(fo => fo.productId)
    this.catalog.addProducts(products, currencyRate, this.api)
    this.catalog.checkFavorite(favoriteIds)
    this.catalog.checkProductsInCart(inCartIds)
    this.catalog.checkCompare(compareIds)
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
